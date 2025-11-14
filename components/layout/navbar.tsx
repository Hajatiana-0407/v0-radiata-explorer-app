'use client';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            Radiata Explorer
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/destinations" className="text-sm font-medium hover:text-primary">
              Destinations
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user && user.role === 'admin' ? (
              <Link href="/admin">
                <Button size="sm">Admin Panel</Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
