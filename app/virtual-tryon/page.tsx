'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Sparkles, Download, Share2 } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';

export default function VirtualTryOnPage() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setShowResult(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTryOn = async () => {
        if (!uploadedImage || !selectedProduct) {
            alert('Please upload an image and select a product');
            return;
        }

        setIsProcessing(true);
        // Simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setShowResult(true);
    };

    const handleReset = () => {
        setUploadedImage(null);
        setSelectedProduct(null);
        setShowResult(false);
    };

    const sneakersAndShoes = products.filter((p) => p.category === 'sneakers');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">AI-Powered Technology</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Virtual Try-On</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    See how our products look on you before you buy. Upload your photo and select a product to get started.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Upload Section */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h2 className="text-xl font-bold mb-4">Step 1: Upload Your Photo</h2>
                        {!uploadedImage ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-black transition-colors"
                            >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Click to upload your photo</p>
                                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <Image src={uploadedImage} alt="Uploaded" fill className="object-cover" />
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Product Selection */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Step 2: Select Product</h2>
                        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                            {sneakersAndShoes.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`text-left border-2 rounded-lg p-3 transition-all ${selectedProduct?.id === product.id
                                            ? 'border-black bg-gray-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="relative aspect-square mb-2 rounded overflow-hidden">
                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <p className="font-medium text-sm truncate">{product.name}</p>
                                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Preview</h2>
                        {!uploadedImage || !selectedProduct ? (
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Upload a photo and select a product to see the magic!</p>
                                </div>
                            </div>
                        ) : showResult ? (
                            <div>
                                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                                    {/* In a real app, this would show the AI-processed result */}
                                    <Image src={uploadedImage} alt="Try-on result" fill className="object-cover" />
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                                        AI Preview Applied
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full btn-primary flex items-center justify-center space-x-2">
                                        <Download className="w-5 h-5" />
                                        <span>Download Result</span>
                                    </button>
                                    <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                                        <Share2 className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                    <button onClick={handleReset} className="w-full btn-secondary">
                                        Try Another
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                                    <Image src={uploadedImage} alt="Your photo" fill className="object-cover opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-600">Ready to try on</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleTryOn}
                                    disabled={isProcessing}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <Sparkles className="w-5 h-5 animate-spin" />
                                            <span>Processing...</span>
                                        </span>
                                    ) : (
                                        'Apply Virtual Try-On'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            1
                        </div>
                        <h3 className="font-semibold mb-2">Upload Your Photo</h3>
                        <p className="text-sm text-gray-600">
                            Take or upload a full-body photo with good lighting
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            2
                        </div>
                        <h3 className="font-semibold mb-2">Select Product</h3>
                        <p className="text-sm text-gray-600">
                            Choose any product from our catalog to try on
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            3
                        </div>
                        <h3 className="font-semibold mb-2">See the Result</h3>
                        <p className="text-sm text-gray-600">
                            Our AI instantly shows how the product looks on you
                        </p>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Tips for Best Results</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                        <span className="text-black">•</span>
                        <span>Use a well-lit photo with a clear, uncluttered background</span>
                    </li>
                    <li className="flex items-start space-x-2">
                        <span className="text-black">•</span>
                        <span>Stand in a neutral pose facing the camera</span>
                    </li>
                    <li className="flex items-start space-x-2">
                        <span className="text-black">•</span>
                        <span>For shoes, make sure your feet are clearly visible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                        <span className="text-black">•</span>
                        <span>Avoid wearing similar items to what you want to try on</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
