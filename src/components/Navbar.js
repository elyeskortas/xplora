// src/components/Navbar.js
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useLocale } from "@/context/locale-context"

export default function Navbar() {
  const { messages } = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const handleClickOutside = () => { if (mobileMenuOpen) setMobileMenuOpen(false) }

  // Modern link style: premium underline + white text on dark gradient
  const linkClass = (href) => `nav-link-premium font-medium text-white/90 hover:text-white ${pathname === href ? "is-active" : ""}`

  const navLinks = [
    { href: "/about", label: messages?.about || "About us" }, // placed next to Home
    { href: "/circuits", label: messages?.circuits || "Circuits" },
    { href: "/excursions", label: messages?.excursions || "Excursions" },
    { href: "/custom-trips", label: messages?.vip_private_trips || "VIP Private Trips" },
    { href: "/blog", label: messages?.travel_blog || "Travel Blog" },
    { href: "/gallery", label: messages?.gallery || messages?.gallery_title || "Gallery" }, // new Gallery link next to Travel Blog
    { href: "/contact", label: messages?.contact || "Contact us" },
  ]

  return (
    <>
      {mobileMenuOpen && <div className="fixed inset-0 z-40" onClick={handleClickOutside} />}
      <nav className="relative sticky top-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                <Image src="/images/xplora.jpg" alt="Tunisia Xplora Logo" width={48} height={48} sizes="48px" className="h-12 w-auto" priority />
                <span className="text-2xl font-bold hidden sm:block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Tunisia Xplora</span>
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-8 ml-12">
              <Link href="/" className={linkClass("/")}>{messages?.home || 'Home'}</Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass(l.href)}>{l.label}</Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-white/90 hover:text-white transition-colors" aria-label="Menu" aria-expanded={mobileMenuOpen}>
                <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"} text-xl`}></i>
              </button>
              <div className="p-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-3">
                <Link href="/" className="block nav-link-premium font-medium mobile-nav-link text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{messages?.home || 'Home'}</Link>
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="block nav-link-premium font-medium mobile-nav-link text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}