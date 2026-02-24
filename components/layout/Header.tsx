"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, User, Heart, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CartSidebar from "../cart/CartSidebar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const { isAuthenticated, user } = useAuthStore();
  const totalItems = mounted ? getTotalItems() : 0;

  const categories = [
    { name: "Sneakers", href: "/category/sneakers" },
    { name: "Watches", href: "/category/watches" },
    { name: "Shirts", href: "/category/shirts" },
    { name: "Pants", href: "/category/pants" },
    { name: "New Arrivals", href: "/products/new" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md shadow-black/5"
            : "bg-white shadow-sm"
        }`}
      >
        {/* Top Promo Banner */}
        {showBanner && (
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white text-center py-2 text-xs sm:text-sm">
            {/* shimmer sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            <span className="relative z-10">
              ✦ Free shipping on orders over $100&nbsp;&nbsp;·&nbsp;&nbsp; Use
              code{" "}
              <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded tracking-wide">
                WEARBEFORE10
              </span>{" "}
              for 10% off ✦
            </span>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Close banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main nav row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 select-none shrink-0"
            >
              {/* wordmark */}
              <span className="text-[1.35rem] font-black tracking-tight leading-none">
                <span className="text-gray-900 group-hover:text-violet-700 transition-colors duration-300">
                  Wear
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">
                  Before
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  {cat.name}
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full
                                        bg-gradient-to-r from-violet-500 to-blue-500
                                        scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  />
                </Link>
              ))}

              {/* Contact link */}
              <Link
                href="/contact"
                className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
              >
                Contact
                <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              {/* AI Try-On pill */}
              <Link
                href="/virtual-tryon"
                className="ml-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full
                                    bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-semibold
                                    hover:from-violet-500 hover:to-blue-400
                                    shadow-sm hover:shadow-violet-300/50 hover:shadow-md
                                    transition-all duration-300 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5" />
                AI Try-On
              </Link>
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1">
              {/* Search – desktop */}
              <div className="hidden lg:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-52 pl-9 pr-3 py-1.5 text-sm rounded-full
                                            bg-gray-100 border border-transparent
                                            focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-200
                                            outline-none transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim())
                        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    }}
                  />
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* User */}
              <Link
                href={isAuthenticated ? "/account" : "/auth/login"}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                                    text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline text-sm">
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Login"}
                </span>
              </Link>

              {/* Wishlist */}
              <button className="hidden md:flex p-2 rounded-lg text-gray-600 hover:text-rose-500 hover:bg-rose-50 transition-all">
                <Heart className="w-4 h-4" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5
                                        bg-gradient-to-br from-violet-600 to-blue-500
                                        text-white text-[10px] font-bold rounded-full
                                        flex items-center justify-center"
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu (animated height) ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[32rem]" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-0.5">
            {/* Mobile search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    setIsMenuOpen(false);
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            </div>

            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}

            <Link
              href="/virtual-tryon"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold
                                bg-gradient-to-r from-violet-50 to-blue-50 text-violet-700
                                hover:from-violet-100 hover:to-blue-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Zap className="w-4 h-4" /> AI Try-On
            </Link>

            <Link
              href="/contact"
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href={isAuthenticated ? "/account" : "/auth/login"}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-4 h-4" />
              {isAuthenticated ? "My Account" : "Login / Register"}
            </Link>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
