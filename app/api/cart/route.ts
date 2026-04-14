import { NextResponse } from "next/server";
import { CartItem, Product } from "@/types";
import { ensureSessionUserInDatabase } from "@/lib/auth-session";
import { assertDbClient } from "@/lib/db";
import { ensureDatabaseSchema } from "@/lib/database-schema";

interface CartRow {
  product_id: string;
  quantity: number;
  selected_size: string;
  selected_color: string;
  name: string;
  description: string;
  price: string | number;
  original_price: string | number | null;
  category: Product["category"];
  images: unknown;
  sizes: unknown;
  colors: unknown;
  in_stock: boolean;
  featured: boolean;
  is_new_arrival: boolean;
  rating: string | number | null;
  reviews: number | null;
}

interface IncomingCartItem {
  product?: {
    id?: unknown;
  };
  quantity?: unknown;
  selectedSize?: unknown;
  selectedColor?: unknown;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function mapRowToCartItem(row: CartRow): CartItem {
  return {
    product: {
      id: row.product_id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      originalPrice:
        row.original_price === null ? undefined : Number(row.original_price),
      category: row.category,
      images: toStringArray(row.images),
      sizes: toStringArray(row.sizes),
      colors: toStringArray(row.colors),
      inStock: row.in_stock,
      featured: row.featured,
      isNewArrival: row.is_new_arrival,
      rating: row.rating === null ? undefined : Number(row.rating),
      reviews: row.reviews ?? undefined,
    },
    quantity: row.quantity,
    selectedSize: row.selected_size,
    selectedColor: row.selected_color,
  };
}

async function getUserCartItems(userId: string): Promise<CartItem[]> {
  const sql = assertDbClient();

  const rows = (await sql`
    SELECT
      ci.product_id,
      ci.quantity,
      ci.selected_size,
      ci.selected_color,
      p.name,
      p.description,
      p.price,
      p.original_price,
      p.category,
      p.images,
      p.sizes,
      p.colors,
      p.in_stock,
      p.featured,
      p.is_new_arrival,
      p.rating,
      p.reviews
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    JOIN products p ON p.id = ci.product_id
    WHERE c.user_id = ${userId}
    ORDER BY ci.id ASC;
  `) as CartRow[];

  return rows.map(mapRowToCartItem);
}

function normalizeIncomingItems(payload: unknown): CartItem[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  const normalizedItems: CartItem[] = [];

  for (const item of payload) {
    const casted = item as IncomingCartItem;
    const productId =
      typeof casted.product?.id === "string" ? casted.product.id.trim() : "";
    const selectedSize =
      typeof casted.selectedSize === "string" ? casted.selectedSize.trim() : "";
    const selectedColor =
      typeof casted.selectedColor === "string"
        ? casted.selectedColor.trim()
        : "";
    const quantity =
      typeof casted.quantity === "number"
        ? Math.floor(casted.quantity)
        : Number(casted.quantity ?? 0);

    if (!productId || !selectedSize || !selectedColor || quantity <= 0) {
      continue;
    }

    normalizedItems.push({
      product: {
        id: productId,
        name: "",
        description: "",
        price: 0,
        category: "accessories",
        images: [],
        sizes: [],
        colors: [],
        inStock: true,
      },
      quantity,
      selectedSize,
      selectedColor,
    });
  }

  return normalizedItems;
}

export async function GET() {
  const sessionUser = await ensureSessionUserInDatabase();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureDatabaseSchema();

  const items = await getUserCartItems(sessionUser.id);

  return NextResponse.json({ items });
}

export async function PUT(request: Request) {
  const sessionUser = await ensureSessionUserInDatabase();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureDatabaseSchema();

  let body: { items?: unknown };

  try {
    body = (await request.json()) as { items?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const incomingItems = normalizeIncomingItems(body.items);
  const sql = assertDbClient();

  const cartResult = (await sql`
    INSERT INTO carts (user_id, updated_at)
    VALUES (${sessionUser.id}, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET updated_at = NOW()
    RETURNING id;
  `) as Array<{ id: number }>;

  const cartId = cartResult[0]?.id;

  if (!cartId) {
    return NextResponse.json({ error: "Failed to prepare cart." }, { status: 500 });
  }

  await sql`
    DELETE FROM cart_items
    WHERE cart_id = ${cartId};
  `;

  for (const item of incomingItems) {
    await sql`
      INSERT INTO cart_items (
        cart_id,
        product_id,
        quantity,
        selected_size,
        selected_color,
        updated_at
      ) VALUES (
        ${cartId},
        ${item.product.id},
        ${item.quantity},
        ${item.selectedSize},
        ${item.selectedColor},
        NOW()
      );
    `;
  }

  const items = await getUserCartItems(sessionUser.id);

  return NextResponse.json({ items });
}
