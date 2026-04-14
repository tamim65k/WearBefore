import { NextResponse } from "next/server";
import { ensureSessionUserInDatabase } from "@/lib/auth-session";
import { assertDbClient } from "@/lib/db";
import { ensureDatabaseSchema } from "@/lib/database-schema";

interface CartSourceRow {
  product_id: string;
  quantity: number;
  selected_size: string;
  selected_color: string;
  name: string;
  price: string | number;
}

interface OrderRow {
  id: string;
  status: string;
  subtotal: string | number;
  shipping_amount: string | number;
  tax_amount: string | number;
  total_amount: string | number;
  created_at: string;
}

interface OrderItemRow {
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: string | number;
  quantity: number;
  selected_size: string;
  selected_color: string;
}

interface ShippingPayload {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  state?: unknown;
  zipCode?: unknown;
  country?: unknown;
}

function buildOrderId() {
  const token = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `WB-${token}`;
}

function normalizeShippingAddress(payload: ShippingPayload) {
  return {
    fullName:
      typeof payload.fullName === "string" ? payload.fullName.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    phone: typeof payload.phone === "string" ? payload.phone.trim() : "",
    address: typeof payload.address === "string" ? payload.address.trim() : "",
    city: typeof payload.city === "string" ? payload.city.trim() : "",
    state: typeof payload.state === "string" ? payload.state.trim() : "",
    zipCode: typeof payload.zipCode === "string" ? payload.zipCode.trim() : "",
    country: typeof payload.country === "string" ? payload.country.trim() : "",
  };
}

async function fetchUserCartRows(userId: string) {
  const sql = assertDbClient();

  return (await sql`
    SELECT
      ci.product_id,
      ci.quantity,
      ci.selected_size,
      ci.selected_color,
      p.name,
      p.price
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    JOIN products p ON p.id = ci.product_id
    WHERE c.user_id = ${userId}
    ORDER BY ci.id ASC;
  `) as CartSourceRow[];
}

export async function GET() {
  const sessionUser = await ensureSessionUserInDatabase();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureDatabaseSchema();

  const sql = assertDbClient();
  const orders = (await sql`
    SELECT
      id,
      status,
      subtotal,
      shipping_amount,
      tax_amount,
      total_amount,
      created_at
    FROM orders
    WHERE user_id = ${sessionUser.id}
    ORDER BY created_at DESC;
  `) as OrderRow[];

  const orderIds = orders.map((order) => order.id);
  let orderItems: OrderItemRow[] = [];

  if (orderIds.length > 0) {
    orderItems = (await sql`
      SELECT
        order_id,
        product_id,
        product_name,
        unit_price,
        quantity,
        selected_size,
        selected_color
      FROM order_items
      WHERE order_id = ANY(${orderIds})
      ORDER BY id ASC;
    `) as OrderItemRow[];
  }

  const itemsByOrderId = new Map<string, OrderItemRow[]>();

  orderItems.forEach((item) => {
    const current = itemsByOrderId.get(item.order_id) || [];
    current.push(item);
    itemsByOrderId.set(item.order_id, current);
  });

  return NextResponse.json({
    orders: orders.map((order) => ({
      id: order.id,
      status: order.status,
      subtotal: Number(order.subtotal),
      shippingAmount: Number(order.shipping_amount),
      taxAmount: Number(order.tax_amount),
      totalAmount: Number(order.total_amount),
      createdAt: order.created_at,
      items: (itemsByOrderId.get(order.id) || []).map((item) => ({
        productId: item.product_id,
        productName: item.product_name,
        unitPrice: Number(item.unit_price),
        quantity: item.quantity,
        selectedSize: item.selected_size,
        selectedColor: item.selected_color,
      })),
    })),
  });
}

export async function POST(request: Request) {
  const sessionUser = await ensureSessionUserInDatabase();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureDatabaseSchema();

  let body: { shippingAddress?: ShippingPayload };

  try {
    body = (await request.json()) as { shippingAddress?: ShippingPayload };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const cartRows = await fetchUserCartRows(sessionUser.id);

  if (cartRows.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const subtotal = cartRows.reduce(
    (sum, row) => sum + Number(row.price) * row.quantity,
    0,
  );
  const shippingAmount = subtotal >= 100 ? 0 : 10;
  const taxAmount = subtotal * 0.1;
  const totalAmount = subtotal + shippingAmount + taxAmount;

  const orderId = buildOrderId();
  const shippingAddress = normalizeShippingAddress(body.shippingAddress || {});
  const sql = assertDbClient();

  await sql`
    INSERT INTO orders (
      id,
      user_id,
      status,
      subtotal,
      shipping_amount,
      tax_amount,
      total_amount,
      shipping_address,
      updated_at
    ) VALUES (
      ${orderId},
      ${sessionUser.id},
      ${"processing"},
      ${subtotal},
      ${shippingAmount},
      ${taxAmount},
      ${totalAmount},
      ${JSON.stringify(shippingAddress)},
      NOW()
    );
  `;

  for (const row of cartRows) {
    await sql`
      INSERT INTO order_items (
        order_id,
        product_id,
        product_name,
        unit_price,
        quantity,
        selected_size,
        selected_color
      ) VALUES (
        ${orderId},
        ${row.product_id},
        ${row.name},
        ${row.price},
        ${row.quantity},
        ${row.selected_size},
        ${row.selected_color}
      );
    `;
  }

  await sql`
    DELETE FROM cart_items
    WHERE cart_id IN (
      SELECT id
      FROM carts
      WHERE user_id = ${sessionUser.id}
    );
  `;

  return NextResponse.json({
    orderId,
    totalAmount,
  });
}
