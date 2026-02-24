import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Package,
  Shield,
  Truck,
  Zap,
} from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
        {/* subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1 rounded-full mb-5 text-xs font-medium">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Now with AI Virtual Try-On
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-[1.1] tracking-tight">
                Fashion Forward,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Style First.
                </span>
              </h1>
              <p className="text-base text-gray-400 mb-7 leading-relaxed max-w-md">
                Premium fashion with cutting-edge AI. See exactly how you look
                before you buy.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors font-semibold text-sm"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/virtual-tryon"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-2.5 rounded-full hover:bg-white/10 transition-all font-semibold text-sm"
                >
                  <Zap className="w-4 h-4" /> AI Try-On
                </Link>
              </div>
            </div>
            <div className="relative h-72 lg:h-[420px] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
                alt="Fashion Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders over $100" },
              { icon: Shield, label: "Secure Payment", sub: "100% encrypted" },
              { icon: Package, label: "Easy Returns", sub: "30-day policy" },
              { icon: Zap, label: "AI Try-On", sub: "See before you buy" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3.5">
                <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[11px] text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
                Hand-picked
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
                Collections
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                name: "Sneakers",
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
                href: "/category/sneakers",
              },
              {
                name: "Watches",
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
                href: "/category/watches",
              },
              {
                name: "Shirts",
                image:
                  "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600",
                href: "/category/shirts",
              },
              {
                name: "Pants",
                image:
                  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
                href: "/category/pants",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative rounded-2xl overflow-hidden bg-gray-200"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-bold">
                    {category.name}
                  </h3>
                  <span className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                    Shop now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
