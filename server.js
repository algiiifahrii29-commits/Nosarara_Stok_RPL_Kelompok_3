import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "10mb" }));

const allowed = {
  admin: process.env.ADMIN_PASSWORD || "admin123",
  kasir: process.env.KASIR_PASSWORD || "kasir123",
  pemilik: process.env.PEMILIK_PASSWORD || "pemilik123"
};

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ")) {
    return res.status(401).json({ error: "Silakan login terlebih dahulu." });
  }
  let decoded = "";
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return res.status(401).json({ error: "Autentikasi tidak valid." });
  }
  const split = decoded.indexOf(":");
  const username = decoded.slice(0, split);
  const password = decoded.slice(split + 1);
  if (!Object.hasOwn(allowed, username) || allowed[username] !== password) {
    return res.status(401).json({ error: "Username atau password salah." });
  }
  req.authUser = username;
  next();
}

async function supabaseRequest(method, body) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diatur.");
  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/app_state`;
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
  if (method === "GET") {
    const response = await fetch(`${endpoint}?id=eq.1&select=state,updated_at`, { headers });
    if (!response.ok) throw new Error(await response.text());
    const rows = await response.json();
    return rows[0] || { state: null };
  }
  const response = await fetch(`${endpoint}?on_conflict=id`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: 1, state: body, updated_at: new Date().toISOString() })
  });
  if (!response.ok) throw new Error(await response.text());
  return { ok: true };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Nosarara Stok API", time: new Date().toISOString() });
});

app.get("/api/state", authenticate, async (_req, res) => {
  try {
    res.json(await supabaseRequest("GET"));
  } catch (error) {
    res.status(502).json({ error: "Gagal membaca database.", detail: error.message });
  }
});

app.put("/api/state", authenticate, async (req, res) => {
  const state = req.body?.state;
  if (!state || !Array.isArray(state.items)) {
    return res.status(400).json({ error: "Format data tidak valid." });
  }
  try {
    res.json(await supabaseRequest("PUT", state));
  } catch (error) {
    res.status(502).json({ error: "Gagal menyimpan ke database.", detail: error.message });
  }
});

app.use(express.static(__dirname, { index: "index.html" }));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Nosarara Stok berjalan di http://localhost:${PORT}`);
  console.log("API health check: http://localhost:" + PORT + "/api/health");
});
