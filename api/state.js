export default async function handler(req, res) {
  const allowed = {
    admin: process.env.ADMIN_PASSWORD || "admin123",
    kasir: process.env.KASIR_PASSWORD || "kasir123",
    pemilik: process.env.PEMILIK_PASSWORD || "pemilik123"
  };
  const header = req.headers.authorization || "";
  let username = "", password = "";
  try {
    if (header.startsWith("Basic ")) {
      const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
      const i = decoded.indexOf(":");
      username = decoded.slice(0, i); password = decoded.slice(i + 1);
    }
  } catch {}
  if (!allowed[username] || allowed[username] !== password) {
    return res.status(401).json({ error: "Autentikasi gagal." });
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ error: "Konfigurasi database belum lengkap." });
  const endpoint = `${url}/rest/v1/app_state?id=eq.1`;
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  try {
    if (req.method === "GET") {
      const r = await fetch(endpoint, { headers });
      if (!r.ok) throw new Error(await r.text());
      const rows = await r.json();
      return res.status(200).json(rows.length ? rows[0] : { state: null });
    }
    if (req.method === "PUT") {
      const state = req.body?.state;
      if (!state || !Array.isArray(state.items)) return res.status(400).json({ error: "Format data tidak valid." });
      const r = await fetch(`${url}/rest/v1/app_state?on_conflict=id`, {
        method: "POST",
        headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ id: 1, state, updated_at: new Date().toISOString() })
      });
      if (!r.ok) throw new Error(await r.text());
      return res.status(200).json({ ok: true });
    }
    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method tidak diizinkan." });
  } catch (e) {
    return res.status(502).json({ error: "Gagal mengakses Supabase.", detail: e.message });
  }
}
