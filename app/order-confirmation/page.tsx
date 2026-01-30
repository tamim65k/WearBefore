import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderConfirmationPage() {
    const orderId = `WB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
                Thank you for your order. We've received it and will process it shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Order Number</span>
                </div>
                <p className="text-2xl font-bold">{orderId}</p>
            </div>

            <p className="text-gray-600 mb-8">
                A confirmation email has been sent to your email address with order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-primary">
                    Continue Shopping
                </Link>
                <Link href="/account/orders" className="btn-secondary">
                    View Orders
                </Link>
            </div>
        </div>
    );
}
