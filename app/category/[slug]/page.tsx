'use client';

import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
    const params = useParams();
    const category = params.slug as string;
    const products = getProductsByCategory(category);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/products"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-black mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Products</span>
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 capitalize">{category}</h1>
                <p className="text-gray-600">{products.length} products available</p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found in this category</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
