'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// New Arrival Products
const newArrivals = [
    {
        id: 'snk-new-001',
        name: 'Air Zoom Elite',
        description: 'Latest technology in running performance with responsive cushioning and lightweight design.',
        price: 159.99,
        originalPrice: 189.99,
        category: 'sneakers',
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Black', 'White', 'Navy'],
        inStock: true,
        rating: 4.9,
        reviews: 128,
        badge: 'New',
    },
    {
        id: 'wtc-new-001',
        name: 'Chronograph Master',
        description: 'Sophisticated timepiece with precision movement and water-resistant design.',
        price: 449.99,
        category: 'watches',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        sizes: ['One Size'],
        colors: ['Silver', 'Gold', 'Black'],
        inStock: true,
        rating: 4.8,
        reviews: 94,
        badge: 'New',
    },
    {
        id: 'srt-new-001',
        name: 'Premium Oxford Shirt',
        description: 'Tailored fit dress shirt in premium cotton blend. Perfect for formal occasions.',
        price: 79.99,
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Blue', 'Pink'],
        inStock: true,
        rating: 4.7,
        reviews: 156,
        badge: 'New',
    },
    {
        id: 'pnt-new-001',
        name: 'Slim Fit Chinos',
        description: 'Modern slim-fit chinos with stretch fabric for all-day comfort.',
        price: 69.99,
        category: 'pants',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Khaki', 'Navy', 'Gray', 'Black'],
        inStock: true,
        rating: 4.6,
        reviews: 203,
        badge: 'New',
    },
    {
        id: 'snk-new-002',
        name: 'Court Legend Low',
        description: 'Classic court-inspired design with premium leather and retro styling.',
        price: 119.99,
        category: 'sneakers',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['White', 'Black', 'Green'],
        inStock: true,
        rating: 4.8,
        reviews: 167,
        badge: 'New',
    },
    {
        id: 'acc-new-001',
        name: 'Leather Messenger Bag',
        description: 'Handcrafted leather messenger bag with vintage brass hardware.',
        price: 189.99,
        originalPrice: 229.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        sizes: ['One Size'],
        colors: ['Brown', 'Black', 'Tan'],
        inStock: true,
        rating: 4.9,
        reviews: 85,
        badge: 'New',
    },
    {
        id: 'wtc-new-002',
        name: 'Digital Sport Watch',
        description: 'Multi-function digital sports watch with heart rate monitor and GPS.',
        price: 299.99,
        category: 'watches',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800',
        sizes: ['One Size'],
        colors: ['Black', 'Blue', 'Red'],
        inStock: true,
        rating: 4.7,
        reviews: 142,
        badge: 'New',
    },
    {
        id: 'srt-new-002',
        name: 'Henley Long Sleeve',
        description: 'Comfortable henley shirt in soft cotton blend. Perfect for layering.',
        price: 49.99,
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Gray', 'Navy', 'Burgundy', 'Black'],
        inStock: true,
        rating: 4.5,
        reviews: 231,
        badge: 'New',
    },
    {
        id: 'pnt-new-002',
        name: 'Athletic Joggers',
        description: 'Tapered fit joggers with moisture-wicking fabric and zippered pockets.',
        price: 59.99,
        category: 'pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Gray', 'Navy', 'Olive'],
        inStock: true,
        rating: 4.8,
        reviews: 198,
        badge: 'New',
    },
    {
        id: 'snk-new-003',
        name: 'Trail Runner Pro',
        description: 'Rugged trail running shoes with superior grip and water-resistant upper.',
        price: 139.99,
        category: 'sneakers',
        image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800',
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Black', 'Gray', 'Orange'],
        inStock: true,
        rating: 4.7,
        reviews: 174,
        badge: 'New',
    },
    {
        id: 'acc-new-002',
        name: 'Classic Leather Belt',
        description: 'Premium full-grain leather belt with solid brass buckle.',
        price: 39.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800',
        sizes: ['32', '34', '36', '38', '40'],
        colors: ['Black', 'Brown', 'Tan'],
        inStock: true,
        rating: 4.6,
        reviews: 267,
        badge: 'New',
    },
    {
        id: 'srt-new-003',
        name: 'Flannel Button-Up',
        description: 'Cozy flannel shirt in classic plaid pattern. Perfect for fall and winter.',
        price: 64.99,
        category: 'shirts',
        image: 'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Red', 'Blue', 'Green', 'Gray'],
        inStock: true,
        rating: 4.8,
        reviews: 189,
        badge: 'New',
    },
];

export default function NewArrivalsPage() {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (product: typeof newArrivals[0]) => {
        const productObj = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category as 'sneakers' | 'watches' | 'shirts' | 'pants' | 'accessories',
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
                <p className="text-gray-600 text-lg">
                    Discover our latest collection of premium fashion items
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                    <div
                        key={product.id}
                        className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
                    >
                        <Link href={`/products/${product.id}`}>
                            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {product.badge}
                                    </span>
                                </div>
                                {product.originalPrice && (
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            SALE
                                        </span>
                                    </div>
                                )}
                                <button
                                    className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-gray-100"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Add to wishlist functionality
                                    }}
                                >
                                    <Heart className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </Link>

                        <div className="space-y-2">
                            <Link href={`/products/${product.id}`}>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    {product.category}
                                </p>
                                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {product.description}
                                </p>
                            </Link>

                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({product.reviews})</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl font-bold">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className={`w-full py-2 rounded-lg font-semibold transition-all ${selectedProduct === product.id
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                    }`}
                            >
                                {selectedProduct === product.id ? (
                                    'Added to Cart!'
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4 inline mr-2" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
                <p className="text-gray-600 mb-6">
                    Browse our complete collection or use filters to find exactly what you need
                </p>
                <Link
                    href="/products"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                >
                    View All Products
                </Link>
            </div>
        </div>
    );
}
