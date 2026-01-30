'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import CartSidebar from '../cart/CartSidebar';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showBanner, setShowBanner] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Auto-hide banner after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    // Fix hydration error by only showing cart count after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const { isAuthenticated, user } = useAuthStore();
    const totalItems = mounted ? getTotalItems() : 0;

    const categories = [
        { name: 'Sneakers', href: '/category/sneakers' },
        { name: 'Watches', href: '/category/watches' },
        { name: 'Shirts', href: '/category/shirts' },
        { name: 'Pants', href: '/category/pants' },
        { name: 'New Arrivals', href: '/products/new' },
    ];

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                {/* Top Banner */}
                {showBanner && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm transition-all duration-500">
                        Free shipping on orders over $100 | Use code: WEREBEFORE10 for 10% off
                    </div>
                )}

                {/* Main Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-black">WereBefore</div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="text-gray-700 hover:text-black transition-colors font-medium"
                                >
                                    {category.name}
                                </Link>
                            ))}
                            <Link
                                href="/virtual-tryon"
                                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                            >
                                AI Try-On
                            </Link>
                            <Link
                                href="/contact"
                                className="relative text-purple-600 hover:text-purple-700 transition-colors font-medium"
                            >
                                <span className="relative z-10">Contact Us</span>
                                <span className="absolute inset-0 bg-purple-400/20 blur-lg animate-pulse rounded-full"></span>
                            </Link>
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center space-x-4">
                            {/* Search Bar (Desktop) */}
                            <div className="hidden lg:flex items-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                                            }
                                        }}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* User Account */}
                            <Link
                                href={isAuthenticated ? '/account' : '/auth/login'}
                                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-black"
                            >
                                <User className="w-5 h-5" />
                                <span className="text-sm">{isAuthenticated ? user?.name?.split(' ')[0] : 'Login'}</span>
                            </Link>

                            {/* Wishlist */}
                            <button className="hidden md:block text-gray-700 hover:text-black relative">
                                <Heart className="w-5 h-5" />
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center space-x-1 text-gray-700 hover:text-black relative"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden text-gray-700"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-4 py-4 space-y-3">
                            {/* Mobile Search */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>

                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="block text-gray-700 hover:text-black py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                            <Link
                                href="/virtual-tryon"
                                className="block text-blue-600 hover:text-blue-700 py-2 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                AI Try-On
                            </Link>
                            <Link
                                href="/contact"
                                className="block text-purple-600 hover:text-purple-700 py-2 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                            <Link
                                href={isAuthenticated ? '/account' : '/auth/login'}
                                className="block text-gray-700 hover:text-black py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {isAuthenticated ? 'My Account' : 'Login / Register'}
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
