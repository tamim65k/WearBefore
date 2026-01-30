import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Package, Shield, Truck } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function Home() {
    const featuredProducts = getFeaturedProducts();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm">Now with AI Virtual Try-On</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Fashion Forward, Style First
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Discover premium fashion with cutting-edge AI technology. See how you look before you buy.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/products"
                                    className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    href="/virtual-tryon"
                                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all font-semibold text-center"
                                >
                                    Try AI Virtual Try-On
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
                                alt="Fashion Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                                <Truck className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Free Shipping</h3>
                            <p className="text-sm text-gray-600">On orders over $100</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Secure Payment</h3>
                            <p className="text-sm text-gray-600">100% secure transactions</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Easy Returns</h3>
                            <p className="text-sm text-gray-600">30-day return policy</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold mb-2">AI Try-On</h3>
                            <p className="text-sm text-gray-600">See before you buy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                            <p className="text-gray-600">Handpicked items just for you</p>
                        </div>
                        <Link
                            href="/products"
                            className="flex items-center space-x-2 text-black hover:underline font-medium"
                        >
                            <span>View All</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', href: '/category/sneakers' },
                            { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', href: '/category/watches' },
                            { name: 'Shirts', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600', href: '/category/shirts' },
                            { name: 'Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600', href: '/category/pants' },
                        ].map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="group relative h-64 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Try-On Banner */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-4">Experience AI Virtual Try-On</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        See how our products look on you before making a purchase. Upload your photo and try on any item instantly.
                    </p>
                    <Link
                        href="/virtual-tryon"
                        className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                    >
                        <span>Try It Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
