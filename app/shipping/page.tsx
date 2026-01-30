import { Package, Truck, Clock, Globe } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Truck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Free Shipping</h3>
                            <p className="text-sm text-gray-600">On orders over $100</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Clock className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Fast Delivery</h3>
                            <p className="text-sm text-gray-600">2-5 business days</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Track Package</h3>
                            <p className="text-sm text-gray-600">Real-time tracking</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <Globe className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Worldwide</h3>
                            <p className="text-sm text-gray-600">International shipping</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Standard Shipping - FREE (Orders over $100)</h3>
                                <p className="text-gray-600 text-sm mb-2">Delivery in 5-7 business days</p>
                                <p className="text-sm text-gray-500">$10 for orders under $100</p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Express Shipping - $15</h3>
                                <p className="text-gray-600 text-sm">Delivery in 2-3 business days</p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Next Day Delivery - $25</h3>
                                <p className="text-gray-600 text-sm">Order before 2 PM for next day delivery</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
                        <p className="text-gray-600 mb-4">
                            We ship to over 100 countries worldwide. International shipping rates vary by destination and package weight.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Delivery time: 7-14 business days</li>
                            <li>Customs and duties may apply</li>
                            <li>Tracking available for all international orders</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
