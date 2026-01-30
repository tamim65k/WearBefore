export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: 'sneakers' | 'watches' | 'shirts' | 'pants' | 'accessories';
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    featured?: boolean;
    rating?: number;
    reviews?: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: ShippingAddress;
    createdAt: string;
}

export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export interface FilterOptions {
    categories: string[];
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
    sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest';
}
