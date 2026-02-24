"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { SlidersHorizontal } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["sneakers", "watches", "shirts", "pants", "accessories"];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category),
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {searchQuery ? (
              <>
                <span className="text-gray-400 font-normal text-xl block mb-1 text-sm uppercase tracking-widest">
                  Search results for
                </span>
                &ldquo;{searchQuery}&rdquo;
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar: mobile filter toggle + sort */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showFilters
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:inline">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`shrink-0 w-56 lg:block ${showFilters ? "block" : "hidden"}`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-sm">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Category
                </h4>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors text-sm ${
                        selectedCategories.includes(category)
                          ? "bg-violet-50 text-violet-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-3.5 h-3.5 rounded accent-violet-600"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Price
                </h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-violet-600"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span className="font-medium text-gray-900">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-3">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-violet-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading products...</div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
