'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-bold">Shopping Cart ({items.length})</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-black">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-2">Your cart is empty</p>
                                <p className="text-sm text-gray-400">Add some products to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-4 border-b pb-4"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Size: {item.selectedSize} | Color: {item.selectedColor}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.selectedSize,
                                                                item.selectedColor,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.selectedSize,
                                                                item.selectedColor,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-semibold text-sm">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeItem(item.product.id, item.selectedSize, item.selectedColor)
                                            }
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t p-4 space-y-4">
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                Proceed to Checkout
                            </Link>
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="block w-full bg-white text-black border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                View Cart
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
