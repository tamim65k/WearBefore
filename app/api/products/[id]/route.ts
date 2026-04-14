import { NextResponse } from "next/server";
import { getCatalogProductById } from "@/lib/catalog";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;
  const product = await getCatalogProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}
