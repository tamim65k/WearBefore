import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

async function syncCartItemsToServer(items: CartItem[]) {
    try {
        await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
        });
    } catch {
        // Keep local cart fully functional if server sync fails.
    }
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, selectedSize: string, selectedColor: string) => void;
    removeItem: (productId: string, selectedSize: string, selectedColor: string) => void;
    updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
    clearCart: () => void;
    loadFromServer: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, selectedSize, selectedColor) => {
                let updatedItems: CartItem[] = [];

                set((state) => {
                    const existingItem = state.items.find(
                        (item) =>
                            item.product.id === product.id &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                    );

                    if (existingItem) {
                        updatedItems = state.items.map((item) =>
                            item.product.id === product.id &&
                                item.selectedSize === selectedSize &&
                                item.selectedColor === selectedColor
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );

                        return {
                            items: updatedItems,
                        };
                    }

                    updatedItems = [...state.items, { product, quantity: 1, selectedSize, selectedColor }];

                    return {
                        items: updatedItems,
                    };
                });

                void syncCartItemsToServer(updatedItems);
            },

            removeItem: (productId, selectedSize, selectedColor) => {
                let updatedItems: CartItem[] = [];

                set((state) => ({
                    items: (() => {
                        updatedItems = state.items.filter(
                        (item) =>
                            !(item.product.id === productId &&
                                item.selectedSize === selectedSize &&
                                item.selectedColor === selectedColor)
                        );

                        return updatedItems;
                    })(),
                }));

                void syncCartItemsToServer(updatedItems);
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

                void syncCartItemsToServer(get().items);
            },

            clearCart: () => {
                set({ items: [] });
                void syncCartItemsToServer([]);
            },

            loadFromServer: async () => {
                try {
                    const response = await fetch('/api/cart', { cache: 'no-store' });

                    if (!response.ok) {
                        return;
                    }

                    const payload = (await response.json()) as { items?: CartItem[] };

                    if (Array.isArray(payload.items)) {
                        set({ items: payload.items });
                    }
                } catch {
                    // Ignore cart hydration errors and keep local data.
                }
            },

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
