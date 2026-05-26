# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New project**, choose a name (e.g. `mamazee`), set a database password, and select a region close to your users.
3. Wait ~2 minutes for the project to provision.

## 2. Get Your API Keys

In your project dashboard, go to **Settings → API**:

| Key | Where to find it |
|-----|-----------------|
| Project URL | "Project URL" field |
| Anon / public key | "anon" key under "Project API keys" |
| Service role key | "service_role" key (keep this secret — server-side only) |

## 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in the three Supabase values plus a random `ADMIN_API_KEY`:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_API_KEY=some-long-random-secret
```

Generate a random admin key with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 4. Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**.
2. Click **New query**.
3. Copy the full contents of `supabase/migrations/001_products.sql` and paste it into the editor.
4. Click **Run**.

This creates the `products` table, enables Row Level Security (anyone can read active products, only the service role key can write), and seeds all 21 products from the current static catalogue.

## 5. Managing Products via Supabase Studio

No code needed for day-to-day inventory management:

1. Open your project dashboard and click **Table Editor** in the left sidebar.
2. Select the **products** table.
3. **Add a product**: Click **Insert row**, fill in the fields, click **Save**.
4. **Edit a product**: Click any cell to edit inline, then click outside to save.
5. **Remove a product**: Set `active = false` (soft delete) rather than deleting the row — this keeps order history intact.
6. **Feature a product**: Set `featured = true` to show it in the homepage featured section.

### Key columns

| Column | Purpose |
|--------|---------|
| `id` | URL-safe slug, e.g. `palm-oil-1l` |
| `category` | Must be one of: `pantry`, `spices`, `snacks`, `beauty` |
| `price` | Numeric, e.g. `18.95` |
| `featured` | Shows on homepage hero/featured row |
| `tag` | Badge shown on product card, e.g. `Bestseller`, `New`, `Popular` |
| `stock_quantity` | Future use for inventory tracking |
| `active` | Set to `false` to hide without deleting |

## 6. Product Images

For custom product images:

1. In your Supabase dashboard, go to **Storage**.
2. Create a new bucket named `product-images` and set it to **Public**.
3. Upload your image file (JPG/PNG/WebP recommended, square 600×600px).
4. Click the uploaded file and copy the **Public URL**.
5. Paste that URL into the `image` field of your product row in Table Editor.

## 7. How the App Uses Supabase

- **`fetchProducts()`** in `lib/products.ts` — called by server components. Fetches from Supabase REST API with 60-second ISR caching. Falls back to the static array if `NEXT_PUBLIC_SUPABASE_URL` is not set.
- **`GET /api/products`** — returns all active products ordered by category then name.
- **`GET /api/products/[id]`** — returns a single product.
- **`PUT /api/products/[id]`** — updates a product (requires `x-admin-key` header).
- **`DELETE /api/products/[id]`** — soft-deletes a product (requires `x-admin-key` header).
- **`POST /api/products`** — creates a new product (requires `x-admin-key` header).

The `SUPABASE_SERVICE_ROLE_KEY` is only used server-side via `lib/supabase/admin.ts` and is never exposed to the browser.
