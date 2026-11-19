-- Database Nosarara Stok (Supabase / PostgreSQL)
-- Aplikasi versi awal menyimpan seluruh state bisnis sebagai JSONB agar struktur
-- data lama tetap kompatibel. RLS aktif; hanya API Vercel memakai service-role key.
create table if not exists public.app_state (
  id integer primary key check (id = 1),
  state jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.app_state enable row level security;
-- Jangan buat policy untuk anon/authenticated. Akses dilakukan dari API Vercel
-- menggunakan SUPABASE_SERVICE_ROLE_KEY yang hanya disimpan sebagai Environment Variable.
