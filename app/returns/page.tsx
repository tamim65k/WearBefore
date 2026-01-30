import { RefreshCw, Package, Clock } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>

            <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-2 text-blue-900">30-Day Return Policy</h2>
                    <p className="text-blue-800">
                        We offer a hassle-free 30-day return policy. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">How to Return</h2>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Initiate Return</h3>
                                <p className="text-gray-600 text-sm">Log in to your account and go to Order History. Select the item you wish to return.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Print Return Label</h3>
                                <p className="text-gray-600 text-sm">We'll email you a prepaid return shipping label within 24 hours.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Ship It Back</h3>
                                <p className="text-gray-600 text-sm">Pack the item securely and drop it off at any authorized shipping location.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Receive Refund</h3>
                                <p className="text-gray-600 text-sm">Once we receive your return, we'll process your refund within 5-7 business days.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Return Conditions</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Items must be unused and in original condition</li>
                        <li>Original packaging and tags must be intact</li>
                        <li>Proof of purchase required</li>
                        <li>Sale items and final sale products cannot be returned</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
                    <p className="text-gray-600 mb-4">
                        Want a different size or color? We make exchanges easy! Follow the same return process and select "Exchange" instead of "Refund". We'll ship your new item as soon as we receive your return.
                    </p>
                </div>
            </div>
        </div>
    );
}
