'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="group">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <Heart
                            className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                    </button>
                </div>
            </Link>

            <div className="space-y-1">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-sm hover:underline line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {product.rating && (
                    <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(product.rating!)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <p className="text-xs text-gray-500 capitalize">{product.category}</p>
            </div>
        </div>
    );
}
