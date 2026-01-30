import { Product } from '@/types';

export const products: Product[] = [
    // Sneakers
    {
        id: 'snk-001',
        name: 'Urban Runner Pro',
        description: 'Premium running sneakers with advanced cushioning technology and breathable mesh upper. Perfect for daily training and casual wear.',
        price: 129.99,
        originalPrice: 159.99,
        category: 'sneakers',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
        ],
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Black', 'White', 'Gray'],
        inStock: true,
        featured: true,
        rating: 4.8,
        reviews: 342,
    },
    {
        id: 'snk-002',
        name: 'Classic High-Top',
        description: 'Timeless high-top design with premium leather construction. A versatile choice for any streetwear enthusiast.',
        price: 89.99,
        category: 'sneakers',
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
            'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
        ],
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Black', 'White', 'Red'],
        inStock: true,
        rating: 4.6,
        reviews: 218,
    },
    {
        id: 'snk-003',
        name: 'Sport Elite Trainer',
        description: 'Professional-grade training shoes with enhanced stability and support. Designed for serious athletes.',
        price: 149.99,
        category: 'sneakers',
        images: [
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
        ],
        sizes: ['8', '9', '10', '11', '12'],
        colors: ['Blue', 'Black', 'White'],
        inStock: true,
        featured: true,
        rating: 4.9,
        reviews: 456,
    },
    {
        id: 'snk-004',
        name: 'Retro Street Style',
        description: 'Vintage-inspired sneakers with modern comfort. Perfect blend of nostalgia and contemporary design.',
        price: 94.99,
        originalPrice: 119.99,
        category: 'sneakers',
        images: [
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
        ],
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Beige', 'Brown', 'Green'],
        inStock: true,
        rating: 4.5,
        reviews: 189,
    },

    // Watches
    {
        id: 'wtc-001',
        name: 'Chronograph Elite',
        description: 'Sophisticated chronograph watch with Swiss movement. Features date display, stopwatch function, and water resistance up to 100m.',
        price: 599.99,
        category: 'watches',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
            'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Silver', 'Gold', 'Rose Gold'],
        inStock: true,
        featured: true,
        rating: 4.9,
        reviews: 527,
    },
    {
        id: 'wtc-002',
        name: 'Minimalist Titanium',
        description: 'Ultra-thin titanium watch with scratch-resistant sapphire crystal. Perfect for the modern professional.',
        price: 399.99,
        category: 'watches',
        images: [
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Silver', 'Black', 'Blue'],
        inStock: true,
        rating: 4.7,
        reviews: 298,
    },
    {
        id: 'wtc-003',
        name: 'Sport Diver Pro',
        description: 'Professional diving watch with 300m water resistance. Luminous markers and unidirectional bezel for precision timing.',
        price: 749.99,
        originalPrice: 899.99,
        category: 'watches',
        images: [
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Black', 'Blue', 'Green'],
        inStock: true,
        rating: 4.8,
        reviews: 412,
    },
    {
        id: 'wtc-004',
        name: 'Classic Leather Band',
        description: 'Timeless design with genuine leather strap. Quartz movement ensures reliable timekeeping.',
        price: 199.99,
        category: 'watches',
        images: [
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Brown', 'Black', 'Tan'],
        inStock: true,
        rating: 4.6,
        reviews: 345,
    },

    // Shirts
    {
        id: 'srt-001',
        name: 'Premium Oxford Shirt',
        description: '100% cotton Oxford shirt with button-down collar. Perfectly tailored for a sharp, professional look.',
        price: 79.99,
        category: 'shirts',
        images: [
            'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Light Blue', 'Pink'],
        inStock: true,
        featured: true,
        rating: 4.7,
        reviews: 423,
    },
    {
        id: 'srt-002',
        name: 'Casual Linen Blend',
        description: 'Lightweight linen-cotton blend perfect for warm weather. Relaxed fit with modern styling.',
        price: 59.99,
        category: 'shirts',
        images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'White', 'Khaki'],
        inStock: true,
        rating: 4.5,
        reviews: 267,
    },
    {
        id: 'srt-003',
        name: 'Polo Classic Fit',
        description: 'Premium pique cotton polo with ribbed collar and cuffs. A wardrobe essential for smart-casual occasions.',
        price: 49.99,
        originalPrice: 69.99,
        category: 'shirts',
        images: [
            'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy', 'Black', 'White', 'Red'],
        inStock: true,
        rating: 4.6,
        reviews: 512,
    },
    {
        id: 'srt-004',
        name: 'Henley Long Sleeve',
        description: 'Comfortable henley with button placket. Soft fabric perfect for layering or wearing alone.',
        price: 39.99,
        category: 'shirts',
        images: [
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Gray', 'Black', 'Navy', 'Olive'],
        inStock: true,
        rating: 4.4,
        reviews: 198,
    },

    // Pants
    {
        id: 'pnt-001',
        name: 'Slim Fit Chinos',
        description: 'Versatile chino pants with modern slim fit. Wrinkle-resistant fabric perfect for office or casual wear.',
        price: 79.99,
        category: 'pants',
        images: [
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Khaki', 'Navy', 'Black', 'Gray'],
        inStock: true,
        featured: true,
        rating: 4.7,
        reviews: 389,
    },
    {
        id: 'pnt-002',
        name: 'Stretch Denim Jeans',
        description: 'Premium stretch denim with comfort fit. Classic five-pocket design with modern details.',
        price: 89.99,
        category: 'pants',
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        inStock: true,
        rating: 4.8,
        reviews: 621,
    },
    {
        id: 'pnt-003',
        name: 'Cargo Utility Pants',
        description: 'Modern cargo pants with multiple pockets and adjustable cuffs. Durable fabric perfect for everyday wear.',
        price: 69.99,
        originalPrice: 89.99,
        category: 'pants',
        images: [
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
        ],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Olive', 'Black', 'Khaki'],
        inStock: true,
        rating: 4.5,
        reviews: 234,
    },
    {
        id: 'pnt-004',
        name: 'Athletic Joggers',
        description: 'Comfortable joggers with tapered fit and elastic cuffs. Moisture-wicking fabric ideal for active lifestyle.',
        price: 54.99,
        category: 'pants',
        images: [
            'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Gray', 'Navy', 'Charcoal'],
        inStock: true,
        rating: 4.6,
        reviews: 445,
    },

    // Accessories
    {
        id: 'acc-001',
        name: 'Leather Bifold Wallet',
        description: 'Genuine leather wallet with RFID protection. Multiple card slots and bill compartment.',
        price: 49.99,
        category: 'accessories',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Brown', 'Black', 'Tan'],
        inStock: true,
        rating: 4.7,
        reviews: 289,
    },
    {
        id: 'acc-002',
        name: 'Classic Aviator Sunglasses',
        description: 'Timeless aviator design with UV400 protection. Metal frame with adjustable nose pads.',
        price: 89.99,
        category: 'accessories',
        images: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
        ],
        sizes: ['One Size'],
        colors: ['Gold', 'Silver', 'Black'],
        inStock: true,
        rating: 4.6,
        reviews: 367,
    },
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
    return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter(p => p.featured);
};
