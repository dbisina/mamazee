create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  customer_email text,
  customer_name text,
  customer_phone text,
  amount_total integer not null default 0,
  currency text not null default 'aud',
  payment_status text not null default 'unpaid',
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'fulfilled', 'shipped', 'cancelled')),
  delivery_method text,
  shipping_address text,
  items jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: service role only (admin reads/writes via service role key, which bypasses RLS)
alter table orders enable row level security;

create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_status_idx on orders (status);

-- Atomically decrement product stock, never going below zero
create or replace function decrement_stock(p_product_id text, p_qty integer)
returns void
language plpgsql
security definer
as $$
begin
  update products
  set stock_quantity = greatest(stock_quantity - p_qty, 0),
      updated_at = now()
  where id = p_product_id;
end;
$$;
