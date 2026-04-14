import { getDbClient } from "@/lib/db";

let schemaInitialized = false;

export async function ensureDatabaseSchema() {
  if (schemaInitialized) {
    return;
  }

  const sql = getDbClient();

  if (!sql) {
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS app_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      name TEXT,
      avatar TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      original_price NUMERIC(10, 2),
      category TEXT NOT NULL,
      images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      sizes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      colors TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      in_stock BOOLEAN NOT NULL DEFAULT TRUE,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
      rating NUMERIC(3, 2),
      reviews INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS carts (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(user_id)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cart_items (
      id BIGSERIAL PRIMARY KEY,
      cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      selected_size TEXT NOT NULL,
      selected_color TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(cart_id, product_id, selected_size, selected_color)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'processing',
      subtotal NUMERIC(10, 2) NOT NULL,
      shipping_amount NUMERIC(10, 2) NOT NULL,
      tax_amount NUMERIC(10, 2) NOT NULL,
      total_amount NUMERIC(10, 2) NOT NULL,
      shipping_address JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id BIGSERIAL PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
      product_name TEXT NOT NULL,
      unit_price NUMERIC(10, 2) NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      selected_size TEXT NOT NULL,
      selected_color TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
  `;

  schemaInitialized = true;
}
