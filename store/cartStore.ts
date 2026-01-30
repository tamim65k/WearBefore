import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, selectedSize: string, selectedColor: string) => void;
    removeItem: (productId: string, selectedSize: string, selectedColor: string) => void;
    updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, selectedSize, selectedColor) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) =>
                            item.product.id === product.id &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id &&
                                    item.selectedSize === selectedSize &&
                                    item.selectedColor === selectedColor
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { product, quantity: 1, selectedSize, selectedColor }],
                    };
                });
            },

            removeItem: (productId, selectedSize, selectedColor) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            !(item.product.id === productId &&
                                item.selectedSize === selectedSize &&
                                item.selectedColor === selectedColor)
                    ),
                }));
            },

            updateQuantity: (productId, selectedSize, selectedColor, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId, selectedSize, selectedColor);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
