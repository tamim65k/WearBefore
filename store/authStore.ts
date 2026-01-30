import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email, password) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Demo login - accept any credentials
                const demoUser: User = {
                    id: '1',
                    name: 'John Doe',
                    email: email,
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                };

                set({ user: demoUser, isAuthenticated: true });
                return true;
            },

            register: async (name, email, password) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Demo registration
                const demoUser: User = {
                    id: '1',
                    name: name,
                    email: email,
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                };

                set({ user: demoUser, isAuthenticated: true });
                return true;
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (userData) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                }));
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
