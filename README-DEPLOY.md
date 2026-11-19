# Nosarara Stok — server backend + database online

Paket ini berisi frontend aplikasi, server Node.js/Express untuk dijalankan sendiri, dan API serverless untuk Vercel. Data online disimpan di Supabase PostgreSQL.

## A. Siapkan database
1. Buat project di https://supabase.com/
2. Buka SQL Editor → New query.
3. Jalankan seluruh isi `schema.sql`.
4. Buka Project Settings → API, salin Project URL dan `service_role` key. Jangan pernah memasukkan service-role key ke frontend atau membagikannya.

## B. Jalankan server di komputer (lokal)
1. Install Node.js versi LTS dari https://nodejs.org/
2. Ekstrak folder proyek.
3. Salin `.env.example` menjadi `.env`.
4. Isi `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, dan ganti semua password.
5. Buka CMD/Terminal pada folder proyek, jalankan:
   ```bash
   npm install
   npm start
   ```
6. Buka Chrome: http://localhost:3000
7. Cek server: http://localhost:3000/api/health

Server lokal hanya dapat diakses dari komputer itu sendiri melalui localhost. Agar perangkat lain atau internet bisa mengaksesnya, server harus ditempatkan pada hosting/VPS atau deploy ke Vercel.

## C. Deploy ke Vercel (akses internet)
1. Upload seluruh isi folder ini ke repository GitHub (termasuk `api/`, `server.js`, `package.json`, `vercel.json`, `schema.sql`, dan folder `img/`).
2. Import repository tersebut di https://vercel.com/.
3. Tambahkan Environment Variables berikut di Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `KASIR_PASSWORD`
   - `PEMILIK_PASSWORD`
4. Deploy. Vercel akan memberikan URL publik `https://nama-project.vercel.app`.
5. Jika Environment Variables diubah, lakukan Redeploy.

## D. Login aplikasi
Akun demo bawaan:
- admin / admin123
- kasir / kasir123
- pemilik / pemilik123

Ganti password demo sebelum aplikasi dipublikasikan. Pastikan password di konfigurasi login frontend (`app.js`) disamakan dengan password Environment Variables server. Jangan gunakan akun demo untuk penggunaan publik.

## Catatan keamanan dan batasan
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh berada di `.env` lokal atau Environment Variables hosting. Jangan commit `.env` ke GitHub.
- File `.env` sengaja tidak disertakan; gunakan `.env.example` sebagai template.
- Versi ini menyimpan keseluruhan state aplikasi dalam satu baris JSONB (`app_state`) agar kompatibel dengan struktur aplikasi awal. Untuk beberapa kasir yang melakukan perubahan bersamaan, migrasikan ke tabel relasional dan operasi transaksi.
- Login Basic Auth ini adalah mekanisme sederhana untuk proyek/demo, bukan pengganti autentikasi produksi seperti Supabase Auth.
- Server tidak dapat dipublikasikan dari komputer pengguna hanya dengan membuka Chrome; diperlukan hosting/VPS dan konfigurasi database.
