'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
                    <Link href="/products" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                            >
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="font-semibold hover:underline"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Size: {item.selectedSize} | Color: {item.selectedColor}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeItem(item.product.id, item.selectedSize, item.selectedColor)
                                            }
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.selectedSize,
                                                        item.selectedColor,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.selectedSize,
                                                        item.selectedColor,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-lg">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        {totalPrice >= 100 ? 'FREE' : '$10.00'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3 flex items-center justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>
                                        ${(totalPrice + (totalPrice >= 100 ? 0 : 10) + totalPrice * 0.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <Link href="/checkout" className="block w-full btn-primary text-center mb-3">
                                Proceed to Checkout
                            </Link>
                            <Link href="/products" className="block w-full btn-secondary text-center">
                                Continue Shopping
                            </Link>
                            {totalPrice < 100 && (
                                <p className="text-sm text-gray-600 mt-4 text-center">
                                    Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
