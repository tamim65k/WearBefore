import { products as baseProducts } from "@/data/products";
import { newArrivalProducts } from "@/data/newArrivals";
import { Product } from "@/types";
import { getDbClient } from "@/lib/db";
import { ensureDatabaseSchema } from "@/lib/database-schema";

interface ProductRow {
  id: string;
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

export interface CatalogProduct extends Product {
  productUrl: string;
}

const fallbackCatalogMap = new Map<string, CatalogProduct>();

[...baseProducts, ...newArrivalProducts].forEach((product) => {
  fallbackCatalogMap.set(product.id, {
    ...product,
    productUrl: `/products/${product.id}`,
  });
});

const fallbackCatalog = Array.from(fallbackCatalogMap.values());

let seededFromFallback = false;

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function normalizeCategory(value: string): Product["category"] {
  const allowed: Product["category"][] = [
    "sneakers",
    "watches",
    "shirts",
    "pants",
    "accessories",
  ];

  return allowed.includes(value as Product["category"])
    ? (value as Product["category"])
    : "accessories";
}

function mapRowToProduct(row: ProductRow): CatalogProduct {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    originalPrice:
      row.original_price === null ? undefined : Number(row.original_price),
    category: normalizeCategory(row.category),
    images: toStringArray(row.images),
    sizes: toStringArray(row.sizes),
    colors: toStringArray(row.colors),
    inStock: row.in_stock,
    featured: row.featured,
    isNewArrival: row.is_new_arrival,
    rating: row.rating === null ? undefined : Number(row.rating),
    reviews: row.reviews ?? undefined,
    productUrl: `/products/${row.id}`,
  };
}

async function seedProductsFromFallback() {
  if (seededFromFallback) {
    return;
  }

  const sql = getDbClient();

  if (!sql) {
    return;
  }

  await ensureDatabaseSchema();

  const countResult = (await sql`
    SELECT COUNT(*)::TEXT AS count
    FROM products;
  `) as Array<{ count: string }>;

  const count = Number(countResult[0]?.count ?? "0");

  if (count > 0) {
    seededFromFallback = true;
    return;
  }

  for (const product of fallbackCatalog) {
    await sql`
      INSERT INTO products (
        id,
        name,
        description,
        price,
        original_price,
        category,
        images,
        sizes,
        colors,
        in_stock,
        featured,
        is_new_arrival,
        rating,
        reviews,
        updated_at
      ) VALUES (
        ${product.id},
        ${product.name},
        ${product.description},
        ${product.price},
        ${product.originalPrice ?? null},
        ${product.category},
        ${product.images},
        ${product.sizes},
        ${product.colors},
        ${product.inStock},
        ${product.featured ?? false},
        ${product.isNewArrival ?? false},
        ${product.rating ?? null},
        ${product.reviews ?? null},
        NOW()
      )
      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        original_price = EXCLUDED.original_price,
        category = EXCLUDED.category,
        images = EXCLUDED.images,
        sizes = EXCLUDED.sizes,
        colors = EXCLUDED.colors,
        in_stock = EXCLUDED.in_stock,
        featured = EXCLUDED.featured,
        is_new_arrival = EXCLUDED.is_new_arrival,
        rating = EXCLUDED.rating,
        reviews = EXCLUDED.reviews,
        updated_at = NOW();
    `;
  }

  seededFromFallback = true;
}

async function getProductsFromDb(): Promise<CatalogProduct[] | null> {
  const sql = getDbClient();

  if (!sql) {
    return null;
  }

  await seedProductsFromFallback();

  const rows = (await sql`
    SELECT
      id,
      name,
      description,
      price,
      original_price,
      category,
      images,
      sizes,
      colors,
      in_stock,
      featured,
      is_new_arrival,
      rating,
      reviews
    FROM products
    ORDER BY name ASC;
  `) as ProductRow[];

  return rows.map(mapRowToProduct);
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const dbProducts = await getProductsFromDb();
  return dbProducts ?? fallbackCatalog;
}

export async function getCatalogProductById(productId: string) {
  const products = await getCatalogProducts();
  return products.find((product) => product.id === productId);
}

export async function getFeaturedCatalogProducts() {
  const products = await getCatalogProducts();
  return products.filter((product) => product.featured);
}

export async function getNewArrivalCatalogProducts() {
  const products = await getCatalogProducts();
  return products.filter((product) => product.isNewArrival);
}

export async function getCategoryCatalogProducts(category: string) {
  const products = await getCatalogProducts();
  return products.filter((product) => product.category === category);
}
