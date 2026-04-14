import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const allProducts = await getCatalogProducts();
  const params = request.nextUrl.searchParams;

  const search = params.get("search")?.trim().toLowerCase() || "";
  const category = params.get("category")?.trim().toLowerCase() || "";
  const featuredOnly = params.get("featured") === "true";
  const newOnly = params.get("new") === "true";
  const limitParam = Number(params.get("limit") || "0");

  let products = [...allProducts];

  if (search) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search),
    );
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (featuredOnly) {
    products = products.filter((product) => Boolean(product.featured));
  }

  if (newOnly) {
    products = products.filter((product) => Boolean(product.isNewArrival));
  }

  if (limitParam > 0) {
    products = products.slice(0, limitParam);
  }

  return NextResponse.json({ products });
}
