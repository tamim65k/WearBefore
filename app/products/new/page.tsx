"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// New Arrival Products
const newArrivals = [
  {
    id: "snk-new-001",
    name: "Air Zoom Elite",
    description:
      "Latest technology in running performance with responsive cushioning and lightweight design.",
    price: 159.99,
    originalPrice: 189.99,
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Navy"],
    inStock: true,
    rating: 4.9,
    reviews: 128,
    badge: "New",
  },
  {
    id: "wtc-new-001",
    name: "Chronograph Master",
    description:
      "Sophisticated timepiece with precision movement and water-resistant design.",
    price: 449.99,
    category: "watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    sizes: ["One Size"],
    colors: ["Silver", "Gold", "Black"],
    inStock: true,
    rating: 4.8,
    reviews: 94,
    badge: "New",
  },
  {
    id: "srt-new-001",
    name: "Premium Oxford Shirt",
    description:
      "Tailored fit dress shirt in premium cotton blend. Perfect for formal occasions.",
    price: 79.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Pink"],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    badge: "New",
  },
  {
    id: "pnt-new-001",
    name: "Slim Fit Chinos",
    description:
      "Modern slim-fit chinos with stretch fabric for all-day comfort.",
    price: 69.99,
    category: "pants",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Gray", "Black"],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    badge: "New",
  },
  {
    id: "snk-new-002",
    name: "Court Legend Low",
    description:
      "Classic court-inspired design with premium leather and retro styling.",
    price: 119.99,
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Green"],
    inStock: true,
    rating: 4.8,
    reviews: 167,
    badge: "New",
  },
  {
    id: "acc-new-001",
    name: "Leather Messenger Bag",
    description:
      "Handcrafted leather messenger bag with vintage brass hardware.",
    price: 189.99,
    originalPrice: 229.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    inStock: true,
    rating: 4.9,
    reviews: 85,
    badge: "New",
  },
  {
    id: "wtc-new-002",
    name: "Digital Sport Watch",
    description:
      "Multi-function digital sports watch with heart rate monitor and GPS.",
    price: 299.99,
    category: "watches",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
    sizes: ["One Size"],
    colors: ["Black", "Blue", "Red"],
    inStock: true,
    rating: 4.7,
    reviews: 142,
    badge: "New",
  },
  {
    id: "srt-new-002",
    name: "Henley Long Sleeve",
    description:
      "Comfortable henley shirt in soft cotton blend. Perfect for layering.",
    price: 49.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Navy", "Burgundy", "Black"],
    inStock: true,
    rating: 4.5,
    reviews: 231,
    badge: "New",
  },
  {
    id: "pnt-new-002",
    name: "Athletic Joggers",
    description:
      "Tapered fit joggers with moisture-wicking fabric and zippered pockets.",
    price: 59.99,
    category: "pants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Navy", "Olive"],
    inStock: true,
    rating: 4.8,
    reviews: 198,
    badge: "New",
  },
  {
    id: "snk-new-003",
    name: "Trail Runner Pro",
    description:
      "Rugged trail running shoes with superior grip and water-resistant upper.",
    price: 139.99,
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Gray", "Orange"],
    inStock: true,
    rating: 4.7,
    reviews: 174,
    badge: "New",
  },
  {
    id: "acc-new-002",
    name: "Classic Leather Belt",
    description: "Premium full-grain leather belt with solid brass buckle.",
    price: 39.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800",
    sizes: ["32", "34", "36", "38", "40"],
    colors: ["Black", "Brown", "Tan"],
    inStock: true,
    rating: 4.6,
    reviews: 267,
    badge: "New",
  },
  {
    id: "srt-new-003",
    name: "Flannel Button-Up",
    description:
      "Cozy flannel shirt in classic plaid pattern. Perfect for fall and winter.",
    price: 64.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Green", "Gray"],
    inStock: true,
    rating: 4.8,
    reviews: 189,
    badge: "New",
  },
];

export default function NewArrivalsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: (typeof newArrivals)[0]) => {
    const productObj = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category as
        | "sneakers"
        | "watches"
        | "shirts"
        | "pants"
        | "accessories",
      images: [product.image],
      sizes: product.sizes,
      colors: product.colors,
      inStock: product.inStock,
      rating: product.rating,
      reviews: product.reviews,
    };
    addItem(productObj, product.sizes[0], product.colors[0]);
    setSelectedProduct(product.id);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Just Dropped
          </p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-gray-900">
            New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Arrivals
            </span>
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Discover our latest collection of premium fashion — curated and
            freshly added.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-violet-100 hover:border-violet-200 transition-all duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-gradient-to-r from-violet-700 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                    {product.originalPrice && (
                      <span className="bg-rose-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        Sale
                      </span>
                    )}
                  </div>
                  {/* Wishlist */}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-violet-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </Link>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-black text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedProduct === product.id
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                      : "bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white shadow-lg shadow-indigo-900/30"
                  }`}
                >
                  {selectedProduct === product.id ? (
                    <>
                      <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px]">
                        ✓
                      </span>{" "}
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-8 md:p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">
            Explore More
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-gray-900">
            Looking for Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Specific?
            </span>
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Browse our complete collection or filter by category to find exactly
            what you need.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-900/20"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
