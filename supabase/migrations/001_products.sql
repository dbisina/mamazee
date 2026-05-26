create table if not exists products (
  id text primary key,
  name text not null,
  category text not null check (category in ('pantry','spices','snacks','beauty')),
  price numeric(10,2) not null,
  unit text not null,
  description text not null,
  image text not null,
  featured boolean default false,
  tag text,
  stock_quantity integer default 999,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: anyone can read active products, only service role can write
alter table products enable row level security;
create policy "Public read active products" on products for select using (active = true);

