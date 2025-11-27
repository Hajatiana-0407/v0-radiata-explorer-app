"use client"

import { useState } from "react"
import Link from "next/link"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Services", href: "/services" },
    { label: "À Propos", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden md:block" style={{ backgroundColor: "#7ac243" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-white hover:text-[#40e0d0] transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>+33 (0)1 23 45 67 89</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="mailto:info@radiata.com"
              className="flex items-center gap-2 text-white hover:text-[#40e0d0] transition-colors font-medium"
            >
              <Mail className="h-4 w-4" />
              <span>info@radiata.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="text-white hover:text-[#40e0d0] font-medium transition-colors">
              Connexion
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/admin" className="text-white hover:text-[#40e0d0] font-medium transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 font-bold text-xl">
              <div className="h-10 w-10 rounded bg-[#7ac243] flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <span className="text-slate-900">Radiata Explorer</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#7ac243] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/reservation">
                <Button className="bg-[#40e0d0] hover:bg-[#3ac9b9] text-slate-900 font-semibold">Réserver</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                <span className="text-2xl text-slate-900">{isMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-[#7ac243] rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
