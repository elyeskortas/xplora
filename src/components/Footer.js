// src/components/Footer.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/context/locale-context";

export default function Footer() {
  const { messages } = useLocale();
  return (
    <footer
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 mt-12 animate-fadeUp"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand + newsletter */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2 hover-lift">
            {/* Use same brand image as Navbar for consistency */}
            <Image src="/images/xplora.jpg" alt="Tunisia Xplora Logo" width={48} height={48} sizes="48px" className="h-12 w-auto" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Tunisia Xplora
            </span>
          </Link>
          <p className="text-sm opacity-80">
            {messages?.footer_description || 'Curated circuits, excursions, and private trips across Tunisia.'}
          </p>
          <form
            className="flex flex-col sm:flex-row sm:space-x-2 mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={messages?.newsletter_placeholder || 'Your email'}
              className="px-4 py-2 rounded-lg newsletter-input w-full sm:w-auto"
            />
            <button type="submit" className="btn btn-light w-100">{messages?.subscribe_button || 'Subscribe'}</button>
          </form>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            { [
                { href: '/', label: messages?.home || 'Home' },
                { href: '/circuits', label: messages?.circuits || 'Circuits' },
                { href: '/excursions', label: messages?.excursions || 'Excursions' },
                { href: '/custom-trips', label: messages?.vip_private_trips || 'VIP Private Trips' },
                { href: '/gallery', label: messages?.gallery || messages?.gallery_title || 'Gallery' },
                { href: '/about', label: messages?.about || 'About' },
                { href: '/contact', label: messages?.contact || 'Contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover-lift inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Legal */}
        <div>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 group hover-lift">
              <i className="bi bi-file-earmark-text-fill text-pink-500 group-hover:rotate-6 transition-transform"></i>
              <Link href="/terms-of-use">{messages?.terms_of_use || 'Terms of use'}</Link>
            </li>
            <li className="flex items-center space-x-2 group hover-lift">
              <i className="bi bi-shield-lock-fill text-pink-500 group-hover:rotate-6 transition-transform"></i>
              <Link href="/privacy-policy">{messages?.privacy_policy || 'Privacy policy'}</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs opacity-70">
        {messages?.copyright || '© 2025 Tunisia Xplora. All rights reserved.'}
      </div>
    </footer>
  );
}