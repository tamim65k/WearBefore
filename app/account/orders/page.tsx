'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';

interface AccountOrderItem {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface AccountOrder {
    id: string;
    status: string;
    subtotal: number;
    shippingAmount: number;
    taxAmount: number;
    totalAmount: number;
    createdAt: string;
    items: AccountOrderItem[];
}

export default function OrdersPage() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const isAuthenticated = Boolean(user);

    const [orders, setOrders] = useState<AccountOrder[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            setOrders([]);
            return;
        }

        const loadOrders = async () => {
            setLoadingOrders(true);

            try {
                const response = await fetch('/api/orders', { cache: 'no-store' });
                const payload = (await response.json()) as { orders?: AccountOrder[]; error?: string };

                if (!response.ok) {
                    throw new Error(payload.error || 'Failed to load orders.');
                }

                setOrders(payload.orders || []);
            } catch {
                setOrders([]);
            } finally {
                setLoadingOrders(false);
            }
        };

        void loadOrders();
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isLoading, isAuthenticated, router]);

    const normalizedOrders = useMemo(
        () =>
            orders.map((order) => ({
                ...order,
                date: order.createdAt,
                total: order.totalAmount,
                itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
            })),
        [orders],
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'shipped':
                return <Truck className="w-5 h-5 text-blue-500" />;
            case 'processing':
                return <Package className="w-5 h-5 text-yellow-500" />;
            default:
                return <XCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            {loadingOrders ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
                    Loading order history...
                </div>
            ) : normalizedOrders.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-600">No orders found yet.</p>
                </div>
            ) : (
            <div className="space-y-4">
                {normalizedOrders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Order {order.id}</h3>
                                <p className="text-sm text-gray-600">
                                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                                {getStatusIcon(order.status)}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
                            <div className="text-sm text-gray-600 mb-2 md:mb-0">
                                {order.itemCount} item{order.itemCount > 1 ? 's' : ''} • Total: <span className="font-semibold text-black">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex space-x-3">
                                <button className="text-sm text-black hover:underline font-medium">
                                    View Details
                                </button>
                                {order.status === 'delivered' && (
                                    <button className="text-sm text-black hover:underline font-medium">
                                        Buy Again
                                    </button>
                                )}
                                {order.status === 'shipped' && (
                                    <button className="text-sm text-black hover:underline font-medium">
                                        Track Package
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
