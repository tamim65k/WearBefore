'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Bell, Lock, CreditCard, Globe } from 'lucide-react';

export default function SettingsPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        newsletter: true,
        twoFactorAuth: false,
        language: 'en',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <Bell className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Notifications</h2>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between">
                            <span className="text-sm">Email Notifications</span>
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) =>
                                    setSettings({ ...settings, emailNotifications: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-sm">Push Notifications</span>
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={(e) =>
                                    setSettings({ ...settings, pushNotifications: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-sm">SMS Notifications</span>
                            <input
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={(e) =>
                                    setSettings({ ...settings, smsNotifications: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-sm">Newsletter</span>
                            <input
                                type="checkbox"
                                checked={settings.newsletter}
                                onChange={(e) => setSettings({ ...settings, newsletter: e.target.checked })}
                                className="w-4 h-4"
                            />
                        </label>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <Lock className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Two-Factor Authentication</p>
                                <p className="text-xs text-gray-600">Add an extra layer of security</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={(e) =>
                                    setSettings({ ...settings, twoFactorAuth: e.target.checked })
                                }
                                className="w-4 h-4"
                            />
                        </div>
                        <button className="text-sm text-black hover:underline font-medium">
                            Change Password
                        </button>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <CreditCard className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Payment Methods</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">No saved payment methods</p>
                    <button className="btn-secondary">Add Payment Method</button>
                </div>

                {/* Language & Region */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <Globe className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Language & Region</h2>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select
                            value={settings.language}
                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                            className="input-field"
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <button className="w-full btn-primary">Save Settings</button>
            </div>
        </div>
    );
}
