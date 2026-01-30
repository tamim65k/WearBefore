'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!isAuthenticated || !user) {
        return null;
    }

    const menuItems = [
        { icon: User, label: 'Profile', href: '/account/profile' },
        { icon: Package, label: 'Orders', href: '/account/orders' },
        { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
        { icon: Settings, label: 'Settings', href: '/account/settings' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <User className="w-10 h-10 text-gray-500" />
                            </div>
                            <h2 className="font-semibold">{user.name}</h2>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <item.icon className="w-5 h-5 text-gray-600" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href="/account/orders"
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Package className="w-8 h-8 text-black mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Orders</h3>
                            <p className="text-sm text-gray-600">Track, return, or buy again</p>
                        </Link>

                        <Link
                            href="/account/profile"
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <User className="w-8 h-8 text-black mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Profile</h3>
                            <p className="text-sm text-gray-600">Edit your personal information</p>
                        </Link>

                        <Link
                            href="/account/wishlist"
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Heart className="w-8 h-8 text-black mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Wishlist</h3>
                            <p className="text-sm text-gray-600">Your saved items</p>
                        </Link>

                        <Link
                            href="/account/settings"
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Settings className="w-8 h-8 text-black mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Settings</h3>
                            <p className="text-sm text-gray-600">Manage your account settings</p>
                        </Link>
                    </div>

                    {/* Recent Orders */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                        <div className="text-center py-8 text-gray-500">
                            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No orders yet</p>
                            <Link href="/products" className="text-black hover:underline mt-2 inline-block">
                                Start shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
