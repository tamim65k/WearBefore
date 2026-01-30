'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ArrowLeft, Star, Truck, Shield, Heart, Check } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;
    const product = getProductById(productId);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
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
            alert('Please select size and color');
            return;
        }

        for (let i = 0; i < quantity; i++) {
            addItem(product, selectedSize, selectedColor);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/products"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-black mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Products</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <div>
                    <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        {product.originalPrice && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                SALE -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </div>
                        )}
                    </div>
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-black' : ''
                                        }`}
                                >
                                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 uppercase mb-2">{product.category}</p>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        </div>
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                            <Heart
                                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                            />
                        </button>
                    </div>

                    {product.rating && (
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating!)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>
                    )}

                    <div className="flex items-center space-x-3 mb-6">
                        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <label className="font-medium">Size</label>
                            <Link href="/size-guide" className="text-sm text-black hover:underline">
                                Size Guide
                            </Link>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-2 border rounded-lg font-medium transition-all ${selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-6">
                        <label className="font-medium mb-3 block">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${selectedColor === color
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                        <label className="font-medium mb-3 block">Quantity</label>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all mb-4 ${product.inStock
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            } ${addedToCart ? 'bg-green-600 hover:bg-green-600' : ''}`}
                    >
                        {addedToCart ? (
                            <span className="flex items-center justify-center space-x-2">
                                <Check className="w-5 h-5" />
                                <span>Added to Cart!</span>
                            </span>
                        ) : product.inStock ? (
                            'Add to Cart'
                        ) : (
                            'Out of Stock'
                        )}
                    </button>

                    <Link
                        href="/virtual-tryon"
                        className="block w-full py-4 text-center border-2 border-black rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-all mb-6"
                    >
                        Try with AI Virtual Try-On
                    </Link>

                    {/* Features */}
                    <div className="space-y-3 border-t pt-6">
                        <div className="flex items-center space-x-3">
                            <Truck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Free shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">30-day return policy</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Star className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">100% authentic products</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
