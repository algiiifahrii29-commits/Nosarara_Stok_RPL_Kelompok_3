"use strict";
const K = "stokbaju_v3", $ = s => document.querySelector(s);
const rp = n => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Ikon garis sederhana (SVG inline, mengikuti warna teks)
const IC = {
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  alert: '<path d="M12 3L2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
  down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  up: '<path d="M12 16V5M7 9l5-5 5 5M5 20h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>'
};
const ic = (n, z) => `<svg class="ic" viewBox="0 0 24 24" width="${z || 16}" height="${z || 16}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const logo = '<span class="lg" aria-hidden="true">N</span>';
const fd = t => new Date(t).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

// Identitas aplikasi dan toko (dipakai di struk). Ubah di sini bila nama toko berbeda.
const TOKO = { n: "TOKO BAJU PALU", a1: "Jl. RE Martadinata, Tondo", a2: "Kec. Mantikulore, Kota Palu" };

// Data 30 toko hasil survei lapangan
const T = `Quality Distro|Ryadi Hamdani|085255203333|-0.843966|119.883065|Jl. RE Martadinata|Pakaian pria, olahraga, busana muslim, topi, sepatu, tas, sandal, celana, parfum|Tepi jalan|Cash, transfer|Belum bisa QRIS|25rb–350rb|07.00–00.00
Yuli Jaya Collection|Yulia|085143713737|-0.844157|119.882903|Jl. RE Martadinata|Pakaian pria, pakaian anak|Tepi jalan|Cash, transfer|Stok masih manual|5rb–125rb|10.00–22.00
VL Boutique|Vani Lestari|085215881580|-0.84475|119.883098|Jl. RE Martadinata|Pakaian wanita, busana muslimah, tas, aksesoris|Motor & mobil|Cash, transfer|Tidak ada|65rb–200rb|09.00–22.00
Hikmah Shop|Inka Saputri|082135555385|-0.840013|119.883456|Jl. RE Martadinata|Pakaian wanita, aksesoris, skincare, tas, sepatu|Motor & mobil|Cash, transfer, debit|Tidak ada|45rb–300rb|08.00–22.00
Dian Pl Import Shop|Dian|082156468224|-0.838795|119.88331|Jl. RE Martadinata|Thrift wanita & pria, tas, dasi, sepatu, pakaian dalam|Motor & mobil|Cash, transfer|Belum bisa QRIS|10rb–150rb|09.00–22.00
Muslimah Shop|Puput Purnamasari|085931641029|-0.83852|119.883432|Jl. RE Martadinata|Pakaian wanita, baju muslimah, aksesoris, tas, parfum, hijab|Tepi jalan|Cash, transfer, QRIS|Tidak ada|15rb–150rb|08.00–23.00
Thrift By Ninka|Ninka|-|-0.838509|119.883437|Jl. RE Martadinata|Pakaian wanita & pria, tas|Tepi jalan|Cash, transfer|Tidak ada|5rb–100rb|08.00–22.00
Ladies Busana|-|082394721124|-0.837306|119.8834554|Jl. RE Martadinata|Pakaian wanita, tas, jilbab|Tepi jalan|Cash, transfer, QRIS|Tidak ada|8rb–120rb|09.00–22.00
Lima Stuff|Putri Handayani|085168990870|-0.83832|119.885557|Jl. Al Khairat|Pakaian wanita & pria, jilbab, sepatu, tas, aksesoris|Tepi jalan|Cash, transfer, QRIS|Tidak ada|18rb–150rb|10.00–23.00
Indi Shop|Risnawati|-|-0.836145|119.8843|Jl. Pendidikan|Pakaian wanita|Motor & mobil|Cash, transfer, QRIS|Tidak ada|30rb–120rb|09.00–22.00
Rance Official|Reni|081242293437|-0.836149|119.88432|Jl. Pendidikan|Pakaian wanita, tas, aksesoris|Motor & mobil|Cash, QRIS|Tidak ada|59rb–100rb|09.00–19.00
girlstuff.plw|Wulansari|082292968640|-0.836279|119.886832|Jl. Pendidikan|Pakaian wanita, aksesoris, sandal, sepatu|Motor & mobil|Cash, transfer, QRIS, debit|Tidak ada|5rb–395rb|09.00–21.00
Hello Zee|Kak Zee|082261484259|-0.837482|119.889502|Jl. Soekarno Hatta|Pakaian wanita, aksesoris, parfum, jilbab, sandal, sepatu|Motor & mobil|Cash, transfer, QRIS|Stok masih manual|50rb–150rb|08.00–23.00
Wana Fashion|Andi Irwan|085229420004|-0.837079|119.889468|Jl. Soekarno Hatta|Pakaian pria & wanita, aksesoris, hijab|Motor & mobil|Cash, transfer, debit|Stok masih manual|10rb–150rb|07.30–22.00
Athira Shop|Yuyun|082394721124|-0.84346|119.8904|Jl. Untad 1|Pakaian wanita, topi, aksesoris, pakaian anak|Motor & mobil|Cash, transfer, QRIS|Tidak ada|80rb–300rb|09.00–22.00
Bluumi|Masniati|082230323119|-0.839578|119.8898|Jl. Soekarno Hatta|Baju pesta, kebaya, batik, baju anak, gamis, jilbab|Motor saja|Cash, transfer, QRIS|Stok masih manual|125rb–215rb|09.00–22.00
Distro Rock Filler|Ancu|-|-0.847418|119.882752|Jl. RE Martadinata|Pakaian pria dewasa|Motor & mobil|Cash, QRIS, debit|Stok masih manual|100rb–320rb|09.00–00.00
Outfitku|Nilura Niasi|-|-0.848269|119.882584|Jl. RE Martadinata|Pakaian wanita, aksesoris, sepatu|Motor & mobil|Cash, QRIS|Tidak ada|30rb–300rb|10.00–22.00
Rumah Daster Palu|Feren Risku Amalia|082172211482|-0.848606|119.888602|Jl. Roviga|Daster wanita|Motor saja|Cash, QRIS|Stok masih manual|35rb–95rb|09.00–22.00
Sunrise Original|Mulyadin Katutu|-|-0.849302|119.882668|Jl. RE Martadinata|Pakaian pria & wanita skena|Motor saja|Cash, QRIS|Stok masih manual|100rb–350rb|10.00–22.00
Siro Store|Herawati|-|-0.853152|119.883369|Jl. RE Martadinata|Pakaian pria, wanita, anak|Motor saja|Cash, QRIS|Stok masih manual|35rb–170rb|08.00–23.00
Ce Arra|Kristin Wijaya|-|-0.853577|119.883709|Jl. RE Martadinata|Pakaian wanita, aksesoris, skincare|Motor & mobil|Cash, transfer|Tidak ada|20rb–200rb|08.30–21.30
Jihan Shop|Asmiati Mustafa|081244500844|-0.853568|119.88379|Jl. RE Martadinata|Pakaian pria & wanita|Tepi jalan|Cash, transfer, QRIS|Stok masih manual|35rb–180rb|07.30–22.30
Bugis Shop Palu|Faisal|-|-0.854178|119.883695|Jl. RE Martadinata|Pakaian pria dewasa|Tepi jalan|Cash, transfer, QRIS|Stok masih manual|35rb–250rb|08.00–23.00
Asmi Shop|Asmi|-|-0.855265|119.884111|Jl. RE Martadinata|Pakaian pria, wanita, anak|Motor & mobil|Cash, transfer|Stok masih manual|35rb–180rb|07.30–23.30
Erghnut Clothing Store|Yusril|-|-0.855433|119.88402|Jl. RE Martadinata|Pakaian pria dewasa|Motor & mobil|Cash, transfer, QRIS, debit|Stok manual & salah hitung|35rb–500rb|08.00–23.30
Bugis Shop|Nisa|-|-0.855673|119.883877|Jl. RE Martadinata|Pakaian pria dewasa|Tepi jalan|Cash|Stok masih manual|35rb–200rb|08.00–23.40
Split Store|Hendrawan|-|-0.855604|119.883907|Jl. RE Martadinata|Pakaian pria dewasa|Tepi jalan|Cash, transfer, QRIS|Stok masih manual|35rb–265rb|08.00–00.00
Staphira|Staphira Akania|0822189203861|-0.855943|119.884053|Jl. RE Martadinata|Pakaian pria, wanita, anak|Tepi jalan|Cash, transfer|Stok masih manual|100rb–250rb|08.00–01.00
Zalfa Shop|Abdul Aziz Mustafa|-|-0.855842|119.883893|Jl. RE Martadinata|Pakaian pria dewasa & anak|Motor & mobil|Cash, transfer|Stok masih manual|35rb–250rb|06.30–23.30`.split("\n").map((r, i) => {
  const c = r.split("|"), man = /manual/.test(c[9]);
  return { no: i + 1, n: c[0], o: c[1], hp: c[2], la: +c[3], ln: +c[4], al: c[5] + ", Tondo, Mantikulore, Palu", kt: c[6], pk: c[7], by: c[8], kd: c[9], hg: c[10], jm: c[11], st: man ? 4 + (i * 7) % 11 : 22 + (i * 13) % 40, mn: 15 };
});

const TP = {
  kaos: "M30 22L42 18Q50 26 58 18L70 22L84 38L74 46L68 40V82H32V40L26 46L16 38Z",
  kemeja: "M30 22L42 16L50 28L58 16L70 22L84 38L74 46L68 40V84H32V40L26 46L16 38Z",
  jaket: "M28 22L42 16Q50 24 58 16L72 22L88 40L78 52L70 44V86H30V44L22 52L12 40Z",
  celana: "M32 14H68L72 86H54L50 42L46 86H28Z",
  hijab: "M50 12Q82 16 80 54Q78 86 50 90Q22 86 20 54Q18 16 50 12Z",
  gamis: "M38 12H62L70 30L80 90H20L30 30Z",
  daster: "M36 12H64L70 32L78 90H22L30 32Z",
  topi: "M20 62Q20 26 50 26Q80 26 80 62ZM72 62H94Q94 72 72 72Z"
};
const IMG = {
  kaos: "img/kaos-cotton.jpeg",
  kemeja: "img/kemeja-flanel.jpeg",
  celana: "img/celana-chino.jpg",
  hijab: "img/hijab-pashmina.jpg",
  gamis: "img/gamis-syari.jpeg",
  jaket: "img/jaket-hoodie.webp",
  topi: "img/topi-baseball.avif",
  daster: "img/daster-batik.jpg"
};

function svgArt(tp, c) {
  const x = tp === "kemeja" ? '<path d="M50 28V84" stroke="#fff6" stroke-width="2"/>' :
    tp === "jaket" ? '<path d="M50 24V86" stroke="#fff8" stroke-width="2.5" stroke-dasharray="3 2"/>' :
    tp === "daster" ? '<g fill="#fff7"><circle cx="40" cy="50" r="3"/><circle cx="58" cy="62" r="3"/><circle cx="46" cy="76" r="3"/><circle cx="62" cy="42" r="3"/></g>' : "";
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${E(tp)}"><path d="${TP[tp] || TP.kaos}" fill="${E(c)}" stroke="#0003" stroke-width="1.5" stroke-linejoin="round"/>${x}</svg>`;
}
function art(tp, c, img, alt) {
  const src = img || IMG[tp];
  if (src) return `<img class="pimg" src="${E(src)}" alt="${E(alt || tp)}" loading="lazy" onerror="this.outerHTML=svgArt('${E(tp)}','${E(c)}')">`;
  return svgArt(tp, c);
}

// Stok toko disimpan per barang: store.inv = {SKU: jumlah}. store.st selalu = jumlah seluruh inv.
const stTot = s => Object.values(s.inv).reduce((a, b) => a + b, 0), sync = s => { s.st = stTot(s); };
function mkStore(t, it) {
  const n = it.length || 1, b = Math.floor(t.st / n), r = t.st % n, inv = {};
  it.forEach((x, i) => { inv[x.k] = b + (i < r ? 1 : 0); });
  return { no: t.no, st: t.st, mn: t.mn, inv };
}

function seed() {
  const it = [
    ["KS-001", "Kaos Polos Cotton", "Baju", "PT Sandang Utama", "M", "Hitam", "#2b2f36", "kaos", 45000, 85000, 60, 15, "img/kaos-cotton.jpeg"],
    ["KM-002", "Kemeja Flannel", "Baju", "PT Sandang Utama", "L", "Merah", "#b3392f", "kemeja", 70000, 135000, 32, 12, "img/kemeja-flanel.jpeg"],
    ["CL-003", "Celana Chino", "Celana", "CV Garment Palu", "32", "Krem", "#c9b28a", "celana", 80000, 160000, 10, 12, "img/celana-chino.jpg"],
    ["HJ-004", "Hijab Pashmina", "Hijab", "UD Busana Muslimah", "All", "Dusty Pink", "#d49aa5", "hijab", 20000, 45000, 80, 20, "img/hijab-pashmina.jpg"],
    ["GM-005", "Gamis Syari", "Busana Muslim", "UD Busana Muslimah", "L", "Navy", "#2f4a7a", "gamis", 110000, 215000, 18, 8, "img/gamis-syari.jpeg"],
    ["JK-006", "Jaket Hoodie", "Baju", "PT Sandang Utama", "XL", "Abu-abu", "#7b8794", "jaket", 85000, 175000, 9, 10, "img/jaket-hoodie.webp"],
    ["TP-007", "Topi Baseball", "Aksesoris", "CV Garment Palu", "All", "Hitam", "#1f2933", "topi", 15000, 40000, 40, 10, "img/topi-baseball.avif"],
    ["DS-008", "Daster Batik", "Daster", "UD Busana Muslimah", "L", "Hijau", "#3f8f6b", "daster", 30000, 65000, 25, 10, "img/daster-batik.jpg"]
  ].map(a => ({ k: a[0], n: a[1], kat: a[2], sup: a[3], uk: a[4], wr: a[5], hex: a[6], tp: a[7], hb: a[8], hj: a[9], st: a[10], mn: a[11], img: a[12] }));

  return {
    items: it,
    sup: [
      ["PT Sandang Utama", "0811-2200-111", "Jl. Sam Ratulangi, Palu"],
      ["CV Garment Palu", "0812-4400-222", "Jl. Hasanuddin, Palu"],
      ["UD Busana Muslimah", "0813-5500-333", "Jl. Diponegoro, Palu"]
    ],
    stores: T.map(t => mkStore(t, it)),
    jual: [],
    masuk: [],
    riw: [],
    dist: [],
    opn: [],
    seq: 1
  };
}

// Lengkapi data lama/rusak agar aplikasi tidak crash saat membuka data versi sebelumnya
function norm(p) {
  const d = seed();
  ["sup", "stores", "jual", "masuk", "riw", "dist", "opn"].forEach(k => { if (!Array.isArray(p[k])) p[k] = d[k]; });
  p.items = p.items.filter(i => i && typeof i.k === "string" && i.k);
  p.items.forEach(i => {
    ["hb", "hj", "st", "mn"].forEach(f => { i[f] = Number.isFinite(+i[f]) ? +i[f] : 0; });
    ["n", "kat", "sup", "uk", "wr"].forEach(f => { if (i[f] == null) i[f] = ""; });
    if (!TP[i.tp]) i.tp = "kaos";
    if (!i.hex) i.hex = "#6b7280";
    if (!i.img && IMG[i.tp]) i.img = IMG[i.tp];
  });
  p.stores = T.map((t, x) => {
    const o = p.stores[x];
    if (!(o && Number.isFinite(+o.st))) return d.stores[x];
    let inv = o.inv && typeof o.inv === "object" ? o.inv : null;
    if (!inv) inv = mkStore({ no: t.no, st: Math.max(0, Math.round(+o.st)), mn: t.mn }, p.items).inv;
    else Object.keys(inv).forEach(k => { inv[k] = Math.max(0, Math.round(+inv[k] || 0)); });
    const s = { no: t.no, st: 0, mn: Number.isFinite(+o.mn) ? +o.mn : t.mn, inv };
    sync(s);
    return s;
  });
  const mx = p.jual.reduce((a, j) => Math.max(a, +j.id || 0), 0);
  if (!(p.seq > mx)) p.seq = mx + 1;
  return p;
}

let S = (() => {
  try {
    const r = localStorage.getItem(K) || localStorage.getItem("stokbaju_v2");
    if (r) {
      const p = JSON.parse(r);
      if (p && Array.isArray(p.items)) return norm(p);
    }
  } catch (e) {}
  return seed();
})();

let saveErr = false;
const save = () => {
  try {
    localStorage.setItem(K, JSON.stringify(S));
    saveErr = false;
    return true;
  } catch (e) {
    saveErr = true;
    return false;
  }
};

const U = { admin: ["admin123", "Admin"], kasir: ["kasir123", "Kasir"], pemilik: ["pemilik123", "Pemilik"] };
const MENU = {
  admin: ["dash", "barang", "masuk", "kasir", "dist", "opname", "peta", "lap", "struk"],
  kasir: ["dash", "barang", "kasir", "struk"],
  pemilik: ["dash", "peta", "lap", "dist", "struk"]
};
const NM = { dash: "Dashboard", barang: "Data Barang", masuk: "Barang Masuk", kasir: "Kasir", dist: "Distribusi", opname: "Stok Opname", peta: "Peta Toko", lap: "Laporan", struk: "Struk" };

let user = null, tab = "dash", cart = [], mc = [], sel = null, per = "hari", q = "", editK = "", delK = "", opT = "g", pendOp = null, impPend = null, kt = "g";

const toast = m => {
  const t = $("#toast");
  t.setAttribute("role", "status");
  t.setAttribute("aria-live", "polite");
  t.textContent = m;
  t.style.display = "block";
  clearTimeout(toast.h);
  toast.h = setTimeout(() => t.style.display = "none", 3200);
};

const modal = h => {
  const m = $("#m");
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.innerHTML = "<div>" + h + "</div>";
  m.style.display = "flex";
  document.body.classList.add("modal-open");
};

const closeM = () => {
  const m = $("#m");
  m.style.display = "none";
  m.innerHTML = "";
  document.body.classList.remove("modal-open");
};

$("#m").onclick = e => { if (e.target.id === "m") closeM(); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && $("#m").style.display === "flex") closeM(); });

const low = i => i.st <= i.mn, lowS = () => S.stores.filter(s => s.st <= s.mn);
const find = k => S.items.find(i => i.k === k);
const byName = () => T.map((t, i) => ({ t, i })).sort((a, b) => a.t.n.localeCompare(b.t.n, "id"));
const selName = () => (kt === "g" || !T[+kt]) ? "gudang pusat" : T[+kt].n;
const avail = k => {
  const i = find(k);
  if (!i) return 0;
  return (kt === "g" || !S.stores[+kt]) ? i.st : (S.stores[+kt].inv[k] || 0);
};
const saleStore = j => j.ts != null && T[j.ts] ? T[j.ts].n : "Gudang pusat";
const saveMsg = ok => ok ? "" : " Perhatian: gagal menyimpan ke browser.";

const EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYEOFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.9 10.9 0 0 1 12 19C5.5 19 2 12 2 12a18 18 0 0 1 5.1-5.9M9.9 5.1A9.9 9.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2M1 1l22 22"/><path d="M14.1 14.1A3 3 0 1 1 9.9 9.9"/></svg>';

const themeCur = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const themeBtn = () => `<button type="button" class="th" onclick="toggleTheme()" aria-label="Ganti tema terang atau gelap">${themeCur() === "dark" ? ic("sun") + " Terang" : ic("moon") + " Gelap"}</button>`;

function toggleTheme() {
  const t = themeCur() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("nosarara_theme", t); } catch (e) {}
  const mt = document.querySelector('meta[name="theme-color"]');
  if (mt) mt.content = t === "dark" ? "#0a0e14" : "#1b2f6b";
  document.querySelectorAll("button.th").forEach(b => {
    b.innerHTML = t === "dark" ? ic("sun") + " Terang" : ic("moon") + " Gelap";
  });
}

function login() {
  const u = $("#u").value.trim().toLowerCase(), p = $("#p").value;
  if (!U[u] || U[u][0] !== p) {
    $("#le").textContent = "Username atau password salah.";
    return;
  }
  user = u;
  tab = "dash";
  render();
}

function render() {
  if (!user) {
    $("#app").innerHTML = `<div class="login card"><div style="float:right">${themeBtn()}</div><h2>${logo}Nosarara Stok</h2><p class="mut">Sistem Informasi Pengelolaan Stok Barang Toko Baju</p><label for="u">Username</label><input id="u" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" onkeydown="if(event.key==='Enter')$('#p').focus()"><label for="p">Password</label><div class="pw"><input id="p" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')login()"><button type="button" aria-label="Tampilkan password" onclick="tpw('p',this)">${EYE}</button></div><p id="le" class="bad" role="alert" style="min-height:20px;margin:8px 0 0"></p><button class="p" style="width:100%" onclick="login()">Masuk</button></div>`;
    return;
  }
  const mn = MENU[user];
  if (!mn.includes(tab)) tab = mn[0];
  const nL = lowS().length, lt = nL + " toko stok menipis";
  $("#app").innerHTML = `<header><div><b>${logo}Nosarara Stok</b><small>${U[user][1]} · ${mn.includes("dist") ? `<a href="#" class="lk" onclick="tab='dist';render();return false">${lt}</a>` : lt}${saveErr ? ' · <span class="bad">' + ic("alert", 13) + ' data belum tersimpan di browser</span>' : ""}</small></div><span class="sp"></span>${themeBtn()}<button onclick="logout()">Keluar</button></header><nav>${mn.map(m => `<button class="${m === tab ? "on" : ""}" ${m === tab ? 'aria-current="page"' : ""} onclick="tab='${m}';render()">${NM[m]}</button>`).join("")}</nav><main>${V[tab]()}</main>`;
  if (tab === "peta") initSatMap();
}

function logout() {
  if (cart.length || mc.length) {
    modal(`<h3>Keluar sekarang?</h3><p>Keranjang kasir atau daftar barang masuk yang belum disimpan akan hilang.</p><div class="row"><button class="d" onclick="user=null;cart=[];mc=[];closeM();render()">Keluar</button><button onclick="closeM()">Batal</button></div>`);
    return;
  }
  user = null;
  render();
}

// ---------- Tampilan per menu ----------
const riwSg = r => r.j === "masuk" ? 1 : r.j === "keluar" ? -1 : (r.n >= 0 ? 1 : -1), riwN = r => r.j === "koreksi" ? Math.abs(r.n) : r.n;
const periodCut = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime() - { hari: 0, minggu: 6, bulan: 29 }[per] * 864e5;
};
const periodSales = () => {
  const c = periodCut();
  return S.jual.filter(j => j.t >= c);
};
const openNow = jm => {
  const m = /^(\d{1,2})\.(\d{2})\s*[–-]\s*(\d{1,2})\.(\d{2})$/.exec(jm || "");
  if (!m) return null;
  const a = +m[1] * 60 + +m[2];
  let b = +m[3] * 60 + +m[4];
  if (b <= a) b += 1440;
  const d = new Date(), n = d.getHours() * 60 + d.getMinutes();
  return (n >= a && n < b) || (n + 1440 >= a && n + 1440 < b);
};
const telL = hp => {
  const d = String(hp || "").replace(/\D/g, "");
  if (d.length < 9) return '<span class="mut">tidak tercatat</span>';
  const w = d.startsWith("0") ? "62" + d.slice(1) : d;
  return `${E(hp)} · <a href="tel:${d}">Telepon</a> · <a href="https://wa.me/${w}" target="_blank" rel="noopener">WhatsApp</a>`;
};

const V = {
  dash() {
    const tp = S.items.reduce((a, i) => a + i.st, 0);
    const td = new Date().toDateString();
    const hs = S.jual.filter(j => new Date(j.t).toDateString() === td).reduce((a, j) => a + j.tot, 0);
    const li = S.items.filter(low), ls = lowS();
    const acts = `<div class="row" style="margin-top:8px">${user === "admin" && li.length ? `<button onclick="tab='masuk';render()">+ Catat barang masuk</button>` : ""}${MENU[user].includes("dist") && ls.length ? `<button onclick="tab='dist';render()">Lihat ${ls.length} toko stok menipis</button>` : ""}</div>`;
    return `<h2>Dashboard</h2><div class="g g2"><div class="card kpi"><b>${S.items.length}</b><span>Jenis barang</span></div><div class="card kpi"><b>${tp}</b><span>Total stok gudang (pcs)</span></div><div class="card kpi"><b>${rp(hs)}</b><span>Penjualan hari ini</span></div><div class="card kpi"><b class="${ls.length ? "bad" : ""}">${ls.length}/30</b><span>Toko stok menipis</span></div></div>
<div class="card"><h3>Notifikasi stok gudang menipis</h3>${li.length ? li.map(i => `<div class="row" style="padding:5px 0"><b class="f">${E(i.n)}</b><span class="tag bad">${i.st === 0 ? "habis" : i.st + " pcs, min " + i.mn}</span></div>`).join("") : '<span class="ok">Semua stok gudang aman.</span>'}${acts}</div>
<div class="card"><h3>Foto stok yang akan didistribusikan</h3>${gal()}</div>`;
  },

  barang() {
    const l = S.items.filter(i => (i.n + i.k + i.kat).toLowerCase().includes(q.toLowerCase()));
    return `<h2>Data Barang</h2><div class="row" style="margin-bottom:10px"><input id="qb" class="f" aria-label="Cari barang" placeholder="Cari kode, nama, kategori…" value="${E(q)}" oninput="q=this.value;render();const x=$('#qb');if(x){x.focus();x.setSelectionRange(q.length,q.length)}">${user === "admin" ? '<button class="p" onclick="fBarang()">+ Tambah</button>' : ""}</div><div class="g g3">${l.map(i => `<div class="card pc">${art(i.tp, i.hex, i.img, i.n)}<div><b>${E(i.n)}</b> <span class="mut">${E(i.k)}</span><div class="mut">${E(i.kat)} · ${E(i.uk)} · ${E(i.wr)}</div><div class="mut">Beli ${rp(i.hb)} · Jual ${rp(i.hj)}</div><div class="row" style="margin-top:6px"><span class="tag ${low(i) ? "bad" : "ok"}">${i.st === 0 ? "Stok habis" : "Stok " + i.st + (low(i) ? " (menipis)" : "")}</span><span class="tag">min ${i.mn}</span></div>${user === "admin" ? `<div class="row" style="margin-top:8px"><button data-k="${E(i.k)}" onclick="fBarang(this.dataset.k)">Ubah</button><button class="d" data-k="${E(i.k)}" onclick="hapus(this.dataset.k)">Hapus</button></div>` : ""}</div></div>`).join("") || '<p class="mut">Barang tidak ditemukan.</p>'}</div>`;
  },

  masuk() {
    mc = mc.filter(c => find(c.k));
    if (!S.items.length) return `<h2>Barang Masuk</h2><div class="card mut">Belum ada data barang. Tambahkan barang dulu di menu Data Barang.</div>`;
    return `<h2>Barang Masuk</h2><div class="card"><div class="g g2"><div><label for="nf">No. faktur supplier</label><input id="nf" placeholder="mis. INV-2026-001"></div><div><label for="sp">Supplier</label><select id="sp">${S.sup.map(s => `<option>${E(s[0])}</option>`).join("")}</select></div></div>
<div class="row"><div class="f" style="flex:3"><label for="mk">Barang</label><select id="mk">${S.items.map(i => `<option value="${E(i.k)}">${E(i.k)} – ${E(i.n)}</option>`).join("")}</select></div><div class="f"><label for="mj">Jumlah</label><input id="mj" type="number" min="1" step="1" value="10"></div><button onclick="addM()" style="margin-top:18px">Tambah</button></div>
<div class="tw">${mc.length ? `<table><tr><th>Barang</th><th>Jumlah</th><th></th></tr>${mc.map((c, x) => `<tr><td>${E(find(c.k).n)}</td><td>${c.j}</td><td><button class="d" aria-label="Hapus ${E(find(c.k).n)} dari faktur" onclick="mc.splice(${x},1);render()">${ic("x", 14)}</button></td></tr>`).join("")}</table>` : '<p class="mut">Belum ada barang pada faktur ini.</p>'}</div><button class="p" style="margin-top:10px" onclick="simM()">Simpan Penerimaan Barang</button></div>
<div class="card"><h3>Riwayat penerimaan</h3>${S.masuk.slice(-5).reverse().map(m => `<div class="mut">${fd(m.t)} · ${E(m.f)} · ${E(m.s)} · ${m.it.reduce((a, c) => a + c.j, 0)} pcs</div>`).join("") || '<span class="mut">Belum ada.</span>'}</div>`;
  },

  kasir() {
    cart = cart.filter(c => find(c.k));
    const tot = cart.reduce((a, c) => a + c.j * c.hj, 0);
    return `<h2>Kasir</h2><div class="card"><label for="kt">Toko penjualan (nama ini dicetak di struk)</label><select id="kt" onchange="kt=this.value;render()" ${cart.length ? "disabled" : ""}><option value="g" ${kt === "g" ? "selected" : ""}>Gudang pusat</option>${byName().map(({ t, i }) => `<option value="${i}" ${kt === String(i) ? "selected" : ""}>${E(t.n)}</option>`).join("")}</select>${cart.length ? '<div class="mut">Kosongkan keranjang untuk mengganti toko.</div>' : ""}<div class="row"><div class="f" style="flex:3"><label for="kd">Scan / ketik kode barang</label><input id="kd" list="dl" placeholder="mis. KS-001" onkeydown="if(event.key==='Enter')addC()"><datalist id="dl">${S.items.map(i => `<option value="${E(i.k)}">${E(i.n)} (stok ${avail(i.k)})</option>`).join("")}</datalist></div><div class="f"><label for="kj">Jumlah</label><input id="kj" type="number" min="1" step="1" value="1"></div><button onclick="addC()" style="margin-top:18px">Tambah</button></div>
<div class="tw">${cart.length ? `<table><tr><th>Barang</th><th>Qty</th><th>Subtotal</th><th></th></tr>${cart.map((c, x) => `<tr><td>${E(c.n)}</td><td>${c.j}</td><td>${rp(c.j * c.hj)}</td><td><button class="d" aria-label="Hapus ${E(c.n)} dari keranjang" onclick="cart.splice(${x},1);render()">${ic("x", 14)}</button></td></tr>`).join("")}</table>` : '<p class="mut">Keranjang kosong.</p>'}</div>
<div class="row" style="margin-top:10px"><div class="f"><label for="tn">Uang diterima (opsional)</label><input id="tn" type="number" min="0"></div></div><div class="row" style="margin-top:10px"><b class="f" style="font-size:18px">Total: ${rp(tot)}</b><button class="p" onclick="bayar()" ${cart.length ? "" : "disabled"}>Bayar &amp; Cetak Struk</button></div></div>`;
  },

  dist() {
    const ls = lowS().sort((a, b) => a.st - b.st || T[a.no - 1].n.localeCompare(T[b.no - 1].n, "id"));
    return `<h2>Distribusi ke Toko Stok Menipis</h2><div class="card"><h3>Stok gudang tersedia</h3>${gal()}</div><p class="mut">Toko dianggap menipis bila total stok ≤ batas minimum (${S.stores[0].mn} pcs). Daftar diurutkan dari toko dengan total stok paling sedikit. Jumlah kirim yang disarankan = kekurangan hingga 2× batas minimum. Barang yang dipilih otomatis adalah yang paling sedikit di toko tersebut dan masih tersedia di gudang. ${user === "pemilik" ? "Mode pemilik: hanya melihat." : ""}</p>${ls.map(s => {
      const t = T[s.no - 1], need = Math.max(1, s.mn * 2 - s.st), cand = S.items.filter(i => i.st > 0).sort((a, b) => (s.inv[a.k] || 0) - (s.inv[b.k] || 0)), def = cand[0], dq = def ? Math.min(need, def.st) : 1;
      return `<div class="card"><div class="row"><b class="f">${E(t.n)}</b>${s.st === ls[0].st ? '<span class="tag bad">Paling menipis</span>' : ""}<span class="tag bad">${s.st === 0 ? "stok kosong" : "total " + s.st + " pcs"}</span></div><div class="mut">${E(t.al)} · ${E(t.kd)}</div><div class="mut">Per barang: ${S.items.map(i => E(i.n) + " <b>" + (s.inv[i.k] || 0) + "</b>").join(" · ")}</div><div class="mut">Disarankan kirim sekitar <b>${need} pcs</b>.</div>${user === "admin" ? `<div class="row"><div class="f" style="flex:3"><label for="ds${s.no}">Barang</label><select id="ds${s.no}">${S.items.map(i => `<option value="${E(i.k)}" ${def && i.k === def.k ? "selected" : ""}>${E(i.n)} (gudang ${i.st} · toko ${s.inv[i.k] || 0})</option>`).join("")}</select></div><div class="f"><label for="dq${s.no}">Jumlah</label><input id="dq${s.no}" type="number" min="1" step="1" value="${dq}"></div><button class="p" style="margin-top:18px" onclick="kirim(${s.no})">Kirim</button></div>` : ""}</div>`;
    }).join("") || '<div class="card ok">Semua toko memiliki stok aman.</div>'}
<div class="card"><h3>Riwayat distribusi</h3>${S.dist.slice(-6).reverse().map(d => `<div class="mut">${fd(d.t)} · ${E(d.n)} ke ${E(T[d.s - 1].n)} · ${d.j} pcs</div>`).join("") || '<span class="mut">Belum ada.</span>'}</div>`;
  },

  opname() {
    const tg = opT === "g" ? null : +opT, rows = S.items.map((i, x) => {
      const sys = tg == null ? i.st : (S.stores[tg].inv[i.k] || 0);
      return `<tr><td>${E(i.n)}<div class="mut">${E(i.k)}</div></td><td>${sys}</td><td><input id="oq${x}" type="number" min="0" inputmode="numeric" aria-label="Hitungan fisik ${E(i.n)}" oninput="opDiff(${x},${sys})" style="width:90px"></td><td id="od${x}" class="mut">–</td></tr>`;
    }).join("");
    return `<h2>Stok Opname</h2><div class="card"><p class="mut">Hitung stok fisik, lalu isi kolom Fisik. Baris yang dikosongkan dianggap tidak dihitung dan tidak diubah. Selisih akan mengoreksi stok sistem dan tercatat di riwayat.</p><label for="ot">Lokasi yang dihitung</label><select id="ot" onchange="opT=this.value;render()"><option value="g" ${opT === "g" ? "selected" : ""}>Gudang pusat</option>${byName().map(({ t, i }) => `<option value="${i}" ${opT === String(i) ? "selected" : ""}>${E(t.n)}</option>`).join("")}</select>
<div class="tw"><table><tr><th>Barang</th><th>Sistem</th><th>Fisik</th><th>Selisih</th></tr>${rows || '<tr><td colspan="4" class="mut">Belum ada barang.</td></tr>'}</table></div><label for="onote">Catatan / alasan koreksi (wajib bila ada selisih)</label><input id="onote" placeholder="mis. hitung ulang akhir bulan"><button class="p" style="margin-top:10px" onclick="opReview()">Tinjau &amp; Simpan</button></div>
<div class="card"><h3>Riwayat opname</h3>${S.opn.slice(-6).reverse().map(o => `<div class="mut">${fd(o.t)} · ${o.tg == null ? "Gudang" : E(T[o.tg].n)} · ${o.it.length} barang dikoreksi · ${E(o.u)} · ${E(o.note)}</div>`).join("") || '<span class="mut">Belum ada.</span>'}</div>`;
  },

  peta() {
    return `<h2>Peta Satelit 30 Titik Toko Baju – Tondo, Palu</h2><div class="card"><div class="row" style="margin-bottom:8px"><button id="mbS" class="${mapMode === "satelit" ? "on" : ""}" onclick="setMapLayer('satelit')">${ic("layers")} Satelit</button><button id="mbJ" class="${mapMode === "jalan" ? "on" : ""}" onclick="setMapLayer('jalan')">${ic("map")} Peta Jalan</button><button id="mbL" class="${mapLow ? "on" : ""}" onclick="toggleLow()">${ic("alert")} Hanya stok menipis</button><button onclick="resetMapView()">Reset Tampilan</button></div><div id="satmap" class="map" role="region" aria-label="Peta satelit lokasi 30 toko"></div><div class="mut" style="margin-top:8px"><i class="dot" style="background:var(--bad)"></i>stok menipis (${lowS().length}) &nbsp; <i class="dot" style="background:var(--pri)"></i>stok aman (${30 - lowS().length}) · Ketuk titik pada peta atau baris tabel untuk melihat detail toko. Titik yang berdekatan digabung dan terbuka saat peta diperbesar.</div></div>
<div id="detail">${detailHTML()}</div>
<div class="card tw"><table id="tbl"><tr><th>Toko</th><th>Jalan</th><th>Stok</th></tr>${byName().map(({ t, i }) => `<tr data-i="${i}" tabindex="0" role="button" onclick="selectStore(${i},true)" onkeydown="if(event.key==='Enter')selectStore(${i},true)" style="cursor:pointer;${sel === i ? "background:var(--sf)" : ""}"><td>${E(t.n)}</td><td>${E(t.al.split(",")[0])}</td><td class="${S.stores[i].st <= S.stores[i].mn ? "bad" : ""}">${S.stores[i].st}${S.stores[i].st <= S.stores[i].mn ? ' <span class="tag bad">menipis</span>' : ""}</td></tr>`).join("")}</table></div>`;
  },

  lap() {
    const js = periodSales(), om = js.reduce((a, j) => a + j.tot, 0), pcs = js.reduce((a, j) => a + j.it.reduce((x, c) => x + c.j, 0), 0), laba = js.reduce((a, j) => a + j.it.reduce((x, c) => {
      const it = find(c.k);
      return x + c.j * (c.hj - (it ? it.hb : c.hj));
    }, 0), 0);
    return `<h2>Laporan</h2><div class="row" style="margin-bottom:10px">${["hari", "minggu", "bulan"].map(p => `<button class="${p === per ? "on" : ""}" onclick="per='${p}';render()">${p === "hari" ? "Harian" : p === "minggu" ? "Mingguan" : "Bulanan"}</button>`).join("")}<span class="sp" style="flex:1"></span><button onclick="expCSV()" ${js.length ? "" : "disabled"}>${ic("down")} Ekspor CSV</button></div>
<div class="g g2"><div class="card kpi"><b>${rp(om)}</b><span>Omzet · ${js.length} transaksi</span></div><div class="card kpi"><b>${pcs}</b><span>Barang terjual (pcs)</span></div><div class="card kpi"><b>${rp(laba)}</b><span>Estimasi laba kotor (memakai harga beli saat ini)</span></div></div>
<div class="card tw"><h3>Laporan penjualan</h3><table><tr><th>Waktu</th><th>No</th><th>Toko</th><th>Barang</th><th>Total</th></tr>${js.slice().reverse().map(j => `<tr><td>${fd(j.t)}</td><td>${nom(j.id)}</td><td>${E(saleStore(j))}</td><td>${j.it.map(c => E(c.n) + " ×" + c.j).join(", ")}</td><td>${rp(j.tot)}</td></tr>`).join("") || '<tr><td colspan="5" class="mut">Tidak ada transaksi pada periode ini.</td></tr>'}</table></div>
<div class="card tw"><h3>Laporan stok gudang</h3><table><tr><th>Kode</th><th>Barang</th><th>Stok</th><th>Status</th></tr>${S.items.map(i => `<tr><td>${E(i.k)}</td><td>${E(i.n)}</td><td>${i.st}</td><td><span class="tag ${low(i) ? "bad" : "ok"}">${i.st === 0 ? "Habis" : low(i) ? "Menipis" : "Aman"}</span></td></tr>`).join("")}</table></div>
<div class="card"><h3>Riwayat stok terakhir</h3>${S.riw.slice(-10).reverse().map(r => `<div class="mut">${fd(r.t)} · ${E(r.k)} · <b class="${riwSg(r) > 0 ? "ok" : "bad"}">${riwSg(r) > 0 ? "+" : "−"}${riwN(r)}</b> · ${E(r.ket)}</div>`).join("") || '<span class="mut">Belum ada riwayat.</span>'}</div>
${user === "admin" ? `<div class="card"><h3>Cadangan data</h3><p class="mut">Data hanya tersimpan di browser ini. Unduh cadangan secara berkala, terutama sebelum membersihkan data browser.</p><div class="row"><button onclick="expJSON()">${ic("down")} Unduh cadangan (JSON)</button><button onclick="$('#imp').click()">${ic("up")} Pulihkan dari file</button><input id="imp" type="file" accept="application/json,.json" hidden onchange="impJSON(this)"></div></div>` : ""}`;
  }
};

function gal() {
  return `<div class="g g2 gal-grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">${S.items.map(i => `<div class="card pc" style="margin:0">${art(i.tp, i.hex, i.img, i.n)}<div style="padding:6px 8px"><b style="font-size:12.5px">${E(i.n)}</b><br><span class="tag ${low(i) ? "bad" : "ok"}">${i.st} pcs</span></div></div>`).join("")}</div>`;
}

// ---------- Peta ----------
let lmap = null, cg = null, lmarkers = [], tiles = null, mapMode = "satelit", mapLow = false;
const isLowI = i => S.stores[i].st <= S.stores[i].mn;

function detailHTML() {
  if (sel == null || !T[sel]) return '<p class="mut">Pilih titik lokasi pada peta atau baris tabel untuk melihat detail toko.</p>';
  const s = T[sel], ss = S.stores[sel], ob = openNow(s.jm), lo = ss.st <= ss.mn;
  return `<div class="card"><h3>${E(s.n)} ${ob == null ? "" : `<span class="tag ${ob ? "ok" : "bad"}">${ob ? "Buka sekarang" : "Tutup sekarang"}</span>`}</h3><div class="mut">Pemilik: ${E(s.o === "-" ? "tidak tercatat" : s.o)}</div><div class="mut">HP: ${telL(s.hp)}</div><p style="margin:6px 0">${E(s.al)}<br>Koordinat: ${s.la}, ${s.ln}</p><div class="row" style="margin-bottom:8px"><a class="btn p" style="text-decoration:none" href="https://www.google.com/maps/@?api=1&map_action=map&center=${s.la},${s.ln}&zoom=19&basemap=satellite" target="_blank" rel="noopener">${ic("layers")} Buka Satelit Google Maps</a><a class="btn" style="text-decoration:none" href="https://www.google.com/maps/dir/?api=1&destination=${s.la},${s.ln}" target="_blank" rel="noopener">${ic("route")} Rute Navigasi</a></div><div class="mut">Produk: ${E(s.kt)}<br>Parkir: ${E(s.pk)} · Bayar: ${E(s.by)}<br>Harga: ${E(s.hg)} · Jam: ${E(s.jm)}<br>Kendala: ${E(s.kd)}</div><div style="margin:8px 0"><span class="tag ${lo ? "bad" : "ok"}">Stok toko ${ss.st} pcs${lo ? " (menipis)" : ""}</span></div><div class="tw"><table><tr><th>Barang</th><th>Stok di toko</th></tr>${S.items.map(i => {
    const n = ss.inv[i.k] || 0;
    return `<tr><td>${E(i.n)}</td><td class="${n === 0 ? "bad" : ""}">${n}${n === 0 ? " (kosong)" : ""}</td></tr>`;
  }).join("")}</table></div></div>`;
}

function popupHTML(i) {
  const t = T[i], lo = isLowI(i);
  return `<b>${E(t.n)}</b><br><span style="font-size:12px">${E(t.al)}</span><br><span style="font-size:12px">Stok: <b>${S.stores[i].st} pcs</b> (${lo ? "Menipis" : "Aman"})</span><br><a href="https://www.google.com/maps/@?api=1&map_action=map&center=${t.la},${t.ln}&zoom=19&basemap=satellite" target="_blank" rel="noopener" style="font-size:12px">Buka di Satelit Google Maps</a>`;
}

function mkStyle(i) {
  const isSel = sel === i;
  return { radius: isSel ? 11 : 8, color: isSel ? "#facc15" : "#ffffff", weight: isSel ? 3 : 2, fillColor: isLowI(i) ? "#ff6b6b" : "#3b82f6", fillOpacity: .95 };
}
const restyle = () => lmarkers.forEach((m, i) => m.setStyle(mkStyle(i)));

function refreshMarkers() {
  if (!cg) return;
  cg.clearLayers();
  lmarkers.forEach((m, i) => { if (!mapLow || isLowI(i)) cg.addLayer(m); });
  const b = $("#mbL");
  if (b) b.classList.toggle("on", mapLow);
}

function fitAll() {
  if (!lmap) return;
  const pts = T.filter((t, i) => !mapLow || isLowI(i)).map(t => [t.la, t.ln]);
  if (pts.length) lmap.fitBounds(pts, { padding: [26, 26] });
}

function focusStore(i) {
  const mk = lmarkers[i];
  if (!lmap || !mk || !cg || !cg.hasLayer(mk)) return;
  const ll = [T[i].la, T[i].ln];
  if (cg.zoomToShowLayer) {
    lmap.setView(ll, Math.max(lmap.getZoom(), 17));
    cg.zoomToShowLayer(mk, () => mk.openPopup());
  } else {
    lmap.setView(ll, 18);
    mk.openPopup();
  }
}

function hiRows() {
  document.querySelectorAll("#tbl tr[data-i]").forEach(r => {
    r.style.background = +r.dataset.i === sel ? "var(--sf)" : "";
  });
}

function selectStore(i, sc, fromMap) {
  sel = i;
  if (lmap && lmarkers[i]) {
    if (mapLow && !isLowI(i)) {
      mapLow = false;
      refreshMarkers();
    }
    restyle();
    if (!fromMap) focusStore(i);
  }
  const d = $("#detail");
  if (d) d.innerHTML = detailHTML();
  hiRows();
  if (sc) {
    const m = $("#satmap");
    if (m && m.scrollIntoView) m.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function initSatMap() {
  const el = $("#satmap");
  if (!el) return;
  if (typeof L === "undefined") {
    el.innerHTML = '<div style="padding:18px" class="mut">Peta membutuhkan koneksi internet untuk memuat pustaka peta dan citra satelit. Daftar toko dan detailnya tetap bisa dipakai di tabel di bawah. <a href="https://www.google.com/maps/@-0.845,119.885,15z/data=!3m1!1e3" target="_blank" rel="noopener">Buka Satelit Google Maps Tondo, Palu</a></div>';
    lmap = null;
    cg = null;
    lmarkers = [];
    return;
  }
  if (lmap) {
    lmap.remove();
    lmap = null;
  }
  lmap = L.map(el, { zoomControl: true });
  const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19, attribution: "Citra Satelit &copy; Esri, Maxar, Earthstar Geographics" });
  const lbl = L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19, opacity: 0.9 });
  const str = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap" });
  tiles = { satelit: [sat, lbl], jalan: [str] };
  let warned = false;
  [sat, lbl, str].forEach(t => t.on("tileerror", () => {
    if (!warned) {
      warned = true;
      toast("Sebagian peta gagal dimuat. Periksa koneksi internet.");
    }
  }));
  tiles[mapMode].forEach(t => t.addTo(lmap));
  lmarkers = T.map((t, i) => {
    const mk = L.circleMarker([t.la, t.ln], mkStyle(i));
    mk.bindPopup(popupHTML(i));
    mk.on("click", () => selectStore(i, false, true));
    return mk;
  });
  cg = typeof L.markerClusterGroup === "function" ? L.markerClusterGroup({ maxClusterRadius: 28, showCoverageOnHover: false, spiderfyOnMaxZoom: true }) : L.layerGroup();
  cg.addTo(lmap);
  refreshMarkers();
  fitAll();
  if (sel != null) focusStore(sel);
}

function setMapLayer(m) {
  if (!lmap || !tiles) return;
  mapMode = m;
  Object.values(tiles).forEach(a => a.forEach(t => { if (lmap.hasLayer(t)) lmap.removeLayer(t); }));
  tiles[m].forEach(t => t.addTo(lmap));
  $("#mbS").classList.toggle("on", m === "satelit");
  $("#mbJ").classList.toggle("on", m === "jalan");
}

function toggleLow() {
  mapLow = !mapLow;
  refreshMarkers();
  fitAll();
}

function resetMapView() {
  sel = null;
  mapLow = false;
  if (lmap) {
    lmap.closePopup();
    refreshMarkers();
    restyle();
    fitAll();
  }
  const d = $("#detail");
  if (d) d.innerHTML = detailHTML();
  hiRows();
}

// ---------- Barang ----------
function fBarang(k) {
  editK = k || "";
  const i = k ? find(k) : { k: "", n: "", kat: "Baju", sup: S.sup[0][0], uk: "M", wr: "", hex: "#6b7280", tp: "kaos", hb: 0, hj: 0, st: 0, mn: 10, img: "" };
  if (!i) return toast("Barang tidak ditemukan.");
  modal(`<h3>${k ? "Ubah" : "Tambah"} Barang</h3><label for="f1">Kode (SKU) – huruf, angka, tanda minus</label><input id="f1" value="${E(i.k)}" ${k ? "disabled" : ""}><label for="f2">Nama</label><input id="f2" value="${E(i.n)}"><div class="row"><div class="f"><label for="f3">Kategori</label><input id="f3" value="${E(i.kat)}"></div><div class="f"><label for="f4">Tipe foto</label><select id="f4">${Object.keys(TP).map(t => `<option ${t === i.tp ? "selected" : ""}>${t}</option>`).join("")}</select></div></div><label for="f13">File / URL Gambar (kosongkan untuk gambar bawaan sesuai tipe)</label><input id="f13" placeholder="mis. img/kaos-cotton.jpeg" value="${E(i.img || "")}"><div class="row"><div class="f"><label for="f5">Ukuran</label><input id="f5" value="${E(i.uk)}"></div><div class="f"><label for="f6">Warna</label><input id="f6" value="${E(i.wr)}"></div><div class="f"><label for="f7">Kode warna</label><input id="f7" type="color" value="${E(i.hex)}"></div></div><label for="f8">Supplier</label><select id="f8">${S.sup.map(s => `<option ${s[0] === i.sup ? "selected" : ""}>${E(s[0])}</option>`).join("")}</select><div class="row"><div class="f"><label for="f9">Harga beli</label><input id="f9" type="number" min="0" value="${i.hb}"></div><div class="f"><label for="f10">Harga jual</label><input id="f10" type="number" min="0" value="${i.hj}"></div></div><div class="row"><div class="f"><label for="f11">Stok</label><input id="f11" type="number" min="0" value="${i.st}"></div><div class="f"><label for="f12">Stok minimum</label><input id="f12" type="number" min="0" value="${i.mn}"></div></div><p id="fe" class="bad" role="alert"></p><div class="row"><button class="p" onclick="svB()">Simpan</button><button onclick="closeM()">Batal</button></div>`);
}

function svB() {
  const k = editK, g = n => $("#f" + n).value.trim(), kode = (k || g(1)).toUpperCase(), er = m => { $("#fe").textContent = m; };
  if (!kode || !g(2)) return er("Kode dan nama wajib diisi.");
  if (!k && !/^[A-Z0-9-]+$/.test(kode)) return er("Kode hanya boleh huruf, angka, dan tanda minus (-).");
  if (!k && find(kode)) return er("Kode barang sudah digunakan.");
  const v = [9, 10, 11, 12].map(n => +g(n));
  if (v.some(x => isNaN(x) || x < 0)) return er("Harga dan stok harus angka ≥ 0.");
  if (v[1] < v[0]) return er("Harga jual lebih kecil dari harga beli.");
  const tp = g(4), old = k ? find(k) : null;
  let imgVal = g(13);
  if (!imgVal || (old && tp !== old.tp && imgVal === old.img && old.img === IMG[old.tp])) imgVal = IMG[tp] || "";
  const o = { k: kode, n: g(2), kat: g(3), tp, img: imgVal, uk: g(5), wr: g(6), hex: g(7), sup: g(8), hb: v[0], hj: v[1], st: Math.round(v[2]), mn: Math.round(v[3]) };
  if (k) Object.assign(find(k), o);
  else S.items.push(o);
  const ok = save();
  closeM();
  toast("Data barang tersimpan." + saveMsg(ok));
  render();
}

function hapus(k) {
  const i = find(k);
  if (!i) return;
  delK = k;
  modal(`<h3>Hapus barang?</h3><p>${E(i.n)} akan dihapus dari data barang, termasuk stoknya di semua toko.</p><div class="row"><button class="d" onclick="delB()">Hapus</button><button onclick="closeM()">Batal</button></div>`);
}

function delB() {
  const k = delK;
  S.items = S.items.filter(i => i.k !== k);
  mc = mc.filter(c => c.k !== k);
  cart = cart.filter(c => c.k !== k);
  S.stores.forEach(s => {
    delete s.inv[k];
    sync(s);
  });
  delK = "";
  const ok = save();
  closeM();
  toast("Barang dihapus." + saveMsg(ok));
  render();
}

function addM() {
  const k = $("#mk").value, j = Math.floor(Number($("#mj").value));
  if (!find(k)) return toast("Pilih barang terlebih dahulu.");
  if (!Number.isInteger(j) || j <= 0) return toast("Jumlah harus bilangan bulat lebih dari 0.");
  const c = mc.find(x => x.k === k);
  c ? c.j += j : mc.push({ k, j });
  const f = $("#nf").value, s = $("#sp").value;
  render();
  $("#nf").value = f;
  $("#sp").value = s;
  toast("Ditambahkan ke faktur.");
}

function simM() {
  const f = $("#nf").value.trim(), s = $("#sp").value;
  if (!f) return toast("Nomor faktur wajib diisi.");
  if (!mc.length) return toast("Tambahkan minimal satu barang.");
  if (S.masuk.some(m => m.f.toLowerCase() === f.toLowerCase())) return toast("Nomor faktur sudah pernah dicatat.");
  const t = Date.now();
  mc.forEach(c => {
    find(c.k).st += c.j;
    S.riw.push({ t, k: c.k, j: "masuk", n: c.j, ket: "Faktur " + f });
  });
  S.masuk.push({ t, f, s, it: mc, u: user });
  mc = [];
  const ok = save();
  toast(ok ? "Barang masuk tersimpan, stok bertambah." : "Perhatian: stok bertambah tetapi gagal tersimpan di browser.");
  render();
}

function addC() {
  const v = $("#kd").value.trim().toUpperCase(), j = Math.floor(Number($("#kj").value)), i = find(v);
  if (!i) return toast("Kode barang tidak ditemukan.");
  if (!Number.isInteger(j) || j <= 0) return toast("Jumlah harus bilangan bulat lebih dari 0.");
  const c = cart.find(x => x.k === v), tot = (c ? c.j : 0) + j, av = avail(v);
  if (tot > av) return toast(`Stok tidak cukup di ${selName()}. Tersisa ${av} pcs.`);
  c ? c.j = tot : cart.push({ k: v, n: i.n, j, hj: i.hj });
  const tn = $("#tn").value;
  render();
  $("#tn").value = tn;
  $("#kd").focus();
  toast(i.n + ", " + j + " pcs masuk keranjang.");
}

function kirim(no) {
  const k = $("#ds" + no).value, j = Math.floor(Number($("#dq" + no).value)), i = find(k);
  if (!i) return toast("Pilih barang terlebih dahulu.");
  if (!Number.isInteger(j) || j <= 0) return toast("Jumlah harus bilangan bulat lebih dari 0.");
  if (j > i.st) return toast(`Stok gudang tidak cukup (tersisa ${i.st}).`);
  const s = S.stores[no - 1];
  i.st -= j;
  s.inv[k] = (s.inv[k] || 0) + j;
  sync(s);
  const t = Date.now();
  S.riw.push({ t, k, j: "keluar", n: j, ket: "Distribusi ke " + T[no - 1].n });
  S.dist.push({ t, s: no, n: i.n, j });
  const ok = save();
  toast(`Terkirim ${j} pcs ${i.n} ke ${T[no - 1].n}. Stok toko sekarang ${s.st} pcs.` + saveMsg(ok));
  render();
}

// ---------- Stok opname ----------
function opDiff(x, sys) {
  const v = $("#oq" + x).value.trim(), el = $("#od" + x);
  if (v === "") {
    el.textContent = "–";
    el.className = "mut";
    return;
  }
  const d = Math.round(+v) - sys;
  if (isNaN(d)) {
    el.textContent = "?";
    el.className = "bad";
    return;
  }
  el.textContent = (d > 0 ? "+" : "") + d;
  el.className = d === 0 ? "ok" : "bad";
}

function opReview() {
  const tg = opT === "g" ? null : +opT, ch = [];
  let bad = false;
  S.items.forEach((i, x) => {
    const v = $("#oq" + x).value.trim();
    if (v === "") return;
    if (!(+v >= 0)) {
      bad = true;
      return;
    }
    const a = Math.round(+v), sys = tg == null ? i.st : (S.stores[tg].inv[i.k] || 0);
    if (a !== sys) ch.push({ k: i.k, n: i.n, sys, act: a });
  });
  if (bad) return toast("Jumlah fisik harus angka ≥ 0.");
  if (!ch.length) return toast("Tidak ada selisih. Stok sistem sudah sama dengan hitungan fisik.");
  const note = $("#onote").value.trim();
  if (!note) return toast("Isi catatan / alasan koreksi.");
  pendOp = { tg, ch, note };
  modal(`<h3>Konfirmasi koreksi stok</h3><p class="mut">${tg == null ? "Gudang" : E(T[tg].n)} · ${E(note)}</p>${ch.map(c => `<div class="row" style="padding:3px 0"><span class="f">${E(c.n)}</span><span>${c.sys} menjadi <b>${c.act}</b> <span class="${c.act > c.sys ? "ok" : "bad"}">(${c.act > c.sys ? "+" : ""}${c.act - c.sys})</span></span></div>`).join("")}<div class="row" style="margin-top:12px"><button class="p" onclick="opApply()">Simpan koreksi</button><button onclick="closeM()">Batal</button></div>`);
}

function opApply() {
  const p = pendOp;
  if (!p) return;
  const t = Date.now(), lbl = p.tg == null ? "gudang" : "toko " + T[p.tg].n;
  p.ch.forEach(c => {
    if (p.tg == null) {
      const i = find(c.k);
      if (i) i.st = c.act;
    } else S.stores[p.tg].inv[c.k] = c.act;
    S.riw.push({ t, k: c.k, j: "koreksi", n: c.act - c.sys, ket: "Opname " + lbl + ": " + p.note });
  });
  if (p.tg != null) sync(S.stores[p.tg]);
  S.opn.push({ t, tg: p.tg, u: user, note: p.note, it: p.ch });
  pendOp = null;
  const ok = save();
  closeM();
  toast("Koreksi stok tersimpan." + saveMsg(ok));
  render();
}

// ---------- Ekspor & cadangan ----------
function dl(name, txt, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt], { type }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const csvC = v => {
  let s = String(v == null ? "" : v);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
};
function expCSV() {
  const rows = [["No", "Waktu", "Toko", "Kasir", "Kode", "Barang", "Qty", "Harga", "Subtotal"]];
  periodSales().forEach(j => j.it.forEach(c => rows.push([nom(j.id), fd(j.t), saleStore(j), j.u, c.k, c.n, c.j, c.hj, c.j * c.hj])));
  dl("penjualan-" + per + "-" + new Date().toISOString().slice(0, 10) + ".csv", "\uFEFF" + rows.map(r => r.map(csvC).join(",")).join("\r\n"), "text/csv;charset=utf-8");
  toast("File CSV diunduh.");
}
function expJSON() {
  dl("nosarara-cadangan-" + new Date().toISOString().slice(0, 10) + ".json", JSON.stringify(S), "application/json");
  toast("Cadangan diunduh.");
}
function impJSON(inp) {
  const f = inp.files && inp.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const p = JSON.parse(r.result);
      if (!p || !Array.isArray(p.items)) throw new Error("format");
      impPend = norm(p);
      modal(`<h3>Pulihkan dari cadangan?</h3><p>Seluruh data saat ini akan diganti dengan isi file <b>${E(f.name)}</b> (${impPend.items.length} barang, ${impPend.jual.length} transaksi).</p><div class="row"><button class="d" onclick="impApply()">Ganti data</button><button onclick="closeM()">Batal</button></div>`);
    } catch (e) {
      toast("File cadangan tidak valid.");
    }
    inp.value = "";
  };
  r.readAsText(f);
}
function impApply() {
  if (!impPend) return;
  S = impPend;
  impPend = null;
  cart = [];
  mc = [];
  sel = null;
  const ok = save();
  closeM();
  toast("Data dipulihkan." + saveMsg(ok));
  render();
}
function tpw(i, b) {
  const e = $("#" + i), h = e.type === "password";
  e.type = h ? "text" : "password";
  b.innerHTML = h ? EYEOFF : EYE;
  b.setAttribute("aria-label", h ? "Sembunyikan password" : "Tampilkan password");
}

// ---------- Struk ----------
const canDel = () => user === "admin" || user === "pemilik", nom = id => "#" + String(id).padStart(5, "0");

function rc(j) {
  const st = j.ts != null && T[j.ts] ? T[j.ts] : null;
  const hd = st ? `<b>${E(st.n)}</b><br>${E(st.al)}` : `<b>${E(TOKO.n)}</b><br>${E(TOKO.a1)}<br>${E(TOKO.a2)}`;
  const L = j.it.map(c => `<div>${E(c.n)}</div><div class="r"><span>${c.j} x ${rp(c.hj)}</span><span>${rp(c.j * c.hj)}</span></div>`).join("");
  return `<div class="rc"><div class="c">${hd}</div><hr><div class="r"><span>No</span><span>${nom(j.id)}</span></div><div class="r"><span>Tanggal</span><span>${fd(j.t)}</span></div><div class="r"><span>Kasir</span><span>${E(j.u)}</span></div><hr>${L}<hr><div class="r"><b>TOTAL</b><b>${rp(j.tot)}</b></div>${j.tn ? `<div class="r"><span>Tunai</span><span>${rp(j.tn)}</span></div><div class="r"><span>Kembali</span><span>${rp(j.tn - j.tot)}</span></div>` : ""}<hr><div class="c">Terima kasih<br>Barang yang sudah dibeli<br>tidak dapat dikembalikan</div></div>`;
}

function showRc(id, w) {
  const j = S.jual.find(x => x.id === id);
  if (!j) return;
  modal(rc(j) + (w && w.length ? `<p class="bad np">Stok menipis: ${E(w.join(", "))}</p>` : "") + `<div class="row np" style="margin-top:10px"><button class="p" onclick="window.print()">${ic("print")} Cetak Struk</button><button onclick="closeM()">Tutup</button></div>`);
}

V.struk = () => {
  const l = S.jual.filter(j => !j.h).slice().reverse();
  return `<h2>Struk Transaksi</h2>${canDel() ? `<div class="row" style="margin-bottom:10px"><button class="d" onclick="delAll()" ${l.length ? "" : "disabled"}>${ic("trash")} Hapus semua struk (${l.length})</button></div>` : ""}<p class="mut">Menghapus struk hanya membersihkan daftar ini. Data penjualan di Laporan dan stok tidak berubah.</p>${l.map(j => `<div class="card"><div class="row"><b class="f">${nom(j.id)}</b><span>${rp(j.tot)}</span></div><div style="font-weight:600">${E(saleStore(j))}</div><div class="mut">${fd(j.t)} · kasir ${E(j.u)} · ${j.it.reduce((a, c) => a + c.j, 0)} pcs</div><div class="row" style="margin-top:8px"><button onclick="showRc(${j.id})">Lihat / Cetak</button>${canDel() ? `<button class="d" onclick="delRcAsk(${j.id})">Hapus</button>` : ""}</div></div>`).join("") || '<div class="card mut">Tidak ada struk.</div>'}`;
};

function delRcAsk(id) {
  if (!canDel()) return;
  modal(`<h3>Hapus struk ${nom(id)}?</h3><p>Hanya daftar struk yang dibersihkan. Laporan penjualan dan stok tidak berubah.</p><div class="row"><button class="d" onclick="delRc(${id})">Hapus</button><button onclick="closeM()">Batal</button></div>`);
}

function delRc(id) {
  if (!canDel()) return;
  const j = S.jual.find(x => x.id === id);
  if (j) {
    j.h = 1;
    const ok = save();
    toast("Struk dihapus." + saveMsg(ok));
  }
  closeM();
  render();
}

function delAll() {
  if (!canDel()) return;
  modal(`<h3>Hapus semua struk?</h3><p>Daftar struk dikosongkan. Laporan penjualan dan stok tidak berubah.</p><div class="row"><button class="d" onclick="delAllDo()">Hapus semua</button><button onclick="closeM()">Batal</button></div>`);
}

function delAllDo() {
  if (!canDel()) return;
  S.jual.forEach(j => j.h = 1);
  const ok = save();
  closeM();
  toast("Semua struk dihapus." + saveMsg(ok));
  render();
}

function bayar() {
  if (!cart.length) return;
  for (const c of cart) {
    const i = find(c.k);
    if (!i) return toast("Barang " + c.n + " sudah tidak ada.");
    if (c.j > avail(c.k)) return toast("Stok " + c.n + " di " + selName() + " tidak cukup.");
  }
  const t = Date.now(), tot = cart.reduce((a, c) => a + c.j * c.hj, 0), tn = +($("#tn") && $("#tn").value) || 0;
  if (tn && tn < tot) return toast("Uang diterima kurang dari total.");
  const id = S.seq++, w = [], st = kt === "g" ? null : S.stores[+kt], nm = selName();
  cart.forEach(c => {
    const i = find(c.k);
    if (st) st.inv[c.k] = (st.inv[c.k] || 0) - c.j;
    else i.st -= c.j;
    S.riw.push({ t, k: c.k, j: "keluar", n: c.j, ket: "Penjualan " + nom(id) + " (" + nm + ")" });
    if (!st && low(i)) w.push(i.n);
  });
  if (st) {
    sync(st);
    if (st.st <= st.mn) w.push(nm + " (total " + st.st + " pcs)");
  }
  S.jual.push({ id, t, u: user, it: cart, tot, tn, ts: st ? +kt : null });
  cart = [];
  const ok = save();
  render();
  showRc(id, w);
  if (!ok) toast("Perhatian: gagal menyimpan ke browser.");
}

render();