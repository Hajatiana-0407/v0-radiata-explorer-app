'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/use-app-selector';
import { LoginForm } from '@/components/forms/login-form';

export default function AdminLoginPage() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push('/admin');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-full bg-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold">Radiata Admin</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to manage your content
            </p>
          </div>

          <LoginForm />

          <p className="text-xs text-center text-muted-foreground mt-6">
            Demo credentials: admin@radiata.com / password
          </p>
        </div>
      </div>
    </div>
  );
}
