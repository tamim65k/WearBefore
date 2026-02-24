import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Zap } from "lucide-react";

const shopLinks = [
  { label: "Sneakers", href: "/category/sneakers" },
  { label: "Watches", href: "/category/watches" },
  { label: "Shirts", href: "/category/shirts" },
  { label: "Pants", href: "/category/pants" },
  { label: "New Arrivals", href: "/products/new" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Size Guide", href: "/size-guide" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap gap-x-10 gap-y-5 items-start justify-between">
          {/* Brand */}
          <div className="min-w-[160px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-3 group"
            >
              <span className="text-white font-black text-base tracking-tight">
                Wear
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-400">
                  Before
                </span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed mb-3 max-w-[160px]">
              Premium fashion with AI-powered virtual try-on.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">
              Shop
            </h4>
            <ul className="space-y-1.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">
              Support
            </h4>
            <ul className="space-y-1.5">
              {supportLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Try-On CTA */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">
              AI Try-On
            </h4>
            <p className="text-xs mb-2 leading-relaxed">
              See how clothes look on you before buying.
            </p>
            <Link
              href="/virtual-tryon"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                                bg-gradient-to-r from-violet-600 to-blue-500 text-white
                                hover:from-violet-500 hover:to-blue-400 transition-all"
            >
              <Zap className="w-3 h-3" /> Try It Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>&copy; 2026 WearBefore. All rights reserved.</p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
