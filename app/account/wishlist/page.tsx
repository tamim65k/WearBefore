'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

export default function WishlistPage() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const isAuthenticated = Boolean(user);
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const loadWishlist = async () => {
            setIsLoadingWishlist(true);

            try {
                const response = await fetch('/api/products?limit=4', { cache: 'no-store' });
                const payload = (await response.json()) as { products?: Product[] };

                if (response.ok) {
                    setWishlistItems(payload.products || []);
                }
            } finally {
                setIsLoadingWishlist(false);
            }
        };

        void loadWishlist();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

            {isLoadingWishlist ? (
                <div className="text-center py-16 bg-white rounded-lg">
                    <p className="text-gray-500">Loading wishlist...</p>
                </div>
            ) : wishlistItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Save your favorite items for later</p>
                    <button onClick={() => router.push('/products')} className="btn-primary">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 mb-6">{wishlistItems.length} items in your wishlist</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
