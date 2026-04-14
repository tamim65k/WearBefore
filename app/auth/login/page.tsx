"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-600">
            Secure authentication is powered by Auth0.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <a
            href="/auth/login?returnTo=/account"
            className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            Continue with Auth0
          </a>

          <a
            href="/auth/login?screen_hint=signup&returnTo=/account"
            className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-800 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Create New Account
          </a>

          <p className="text-xs text-gray-500 text-center pt-2">
            By continuing, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
