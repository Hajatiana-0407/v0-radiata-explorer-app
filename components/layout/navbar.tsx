'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'À Propos', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Équipe', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0]"></div>
            <span className="text-slate-900">Radiata</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-[#7ac243] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user && user.role === 'admin' ? (
              <Link href="/admin">
                <Button size="sm" className="bg-[#7ac243] hover:bg-[#6ab12d]">Admin Panel</Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="border-[#7ac243] text-[#7ac243] hover:bg-[#7ac243]/10">
                  Connexion Admin
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <span className="text-2xl text-slate-900">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
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
  );
}
