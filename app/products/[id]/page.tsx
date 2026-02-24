"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, Star, Truck, Shield, Heart, Check } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-black hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  % OFF
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden ring-2 transition-all ${
                      selectedImage === index
                        ? "ring-gray-900"
                        : "ring-transparent hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-2">
            {/* Category + wishlist row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest">
                {product.category}
              </span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  isWishlisted
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>

            <h1 className="text-2xl font-bold tracking-tight mb-2">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-3xl font-black">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Size</span>
                <Link
                  href="/size-guide"
                  className="text-xs text-violet-600 hover:underline"
                >
                  Size guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 hover:border-gray-400 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-4">
              <span className="text-sm font-semibold block mb-2">Color</span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      selectedColor === color
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 hover:border-gray-400 text-gray-700"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <span className="text-sm font-semibold block mb-2">Quantity</span>
              <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2 mb-5">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  !product.inStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Added to Cart!
                  </span>
                ) : product.inStock ? (
                  "Add to Cart"
                ) : (
                  "Out of Stock"
                )}
              </button>

              <Link
                href="/virtual-tryon"
                className="w-full py-3 text-center rounded-xl text-sm font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
              >
                Try with AI Virtual Try-On
              </Link>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              {[
                { icon: Truck, text: "Free shipping $100+" },
                { icon: Shield, text: "30-day returns" },
                { icon: Star, text: "100% authentic" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-full"
                >
                  <Icon className="w-3 h-3" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
