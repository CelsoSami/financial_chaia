-- Chaia Finance - Instalação do banco de dados
-- Execute este script no SQL Editor do seu projeto Supabase (SQL Editor -> New query -> Run)

create table if not exists public.banks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null default 'credit',
  balance numeric not null default 0,
  debt numeric not null default 0,
  invoice_day int,
  color text,
  created_at timestamptz default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  bank_id uuid references public.banks(id) on delete set null,
  date date not null,
  raw_name text not null,
  display_name text,
  category text,
  amount numeric not null,
  type text not null,
  source text not null default 'manual',
  created_at timestamptz default now()
);

create table if not exists public.aliases (
  id uuid primary key default gen_random_uuid(),
  raw_name text not null unique,
  display_name text not null,
  created_at timestamptz default now()
);

create table if not exists public.bills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  amount numeric not null default 0,
  due_day int not null,
  bank_id uuid references public.banks(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists public.bill_payments (
  id uuid primary key default gen_random_uuid(),
  bill_id uuid references public.bills(id) on delete cascade,
  month text not null,
  amount numeric not null,
  paid_at date not null default current_date,
  created_at timestamptz default now(),
  unique (bill_id, month)
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

create index if not exists idx_tx_date on public.transactions(date);
create index if not exists idx_tx_bank on public.transactions(bank_id);

-- Permissões para o aplicativo (acesso apenas pela chave publicável)
alter table public.banks disable row level security;
alter table public.transactions disable row level security;
alter table public.aliases disable row level security;
alter table public.bills disable row level security;
alter table public.bill_payments disable row level security;
alter table public.settings disable row level security;

grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
