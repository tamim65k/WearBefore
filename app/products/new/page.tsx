"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function NewArrivalsPage() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNewArrivals = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/products?new=true", {
          cache: "no-store",
        });
        const payload = (await response.json()) as { products?: Product[] };

        if (response.ok && Array.isArray(payload.products)) {
          setNewArrivals(payload.products);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadNewArrivals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Just Dropped
          </p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-gray-900">
            New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Arrivals
            </span>
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Discover the latest additions to the catalog, now powered by your
            Neon-backed inventory.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading new arrivals...</div>
        ) : newArrivals.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-100">
            No new arrivals are available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-900/20"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
