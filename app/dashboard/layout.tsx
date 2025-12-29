'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    fetch('https://vishwash-backend.onrender.com/api/auth/me', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          router.push('/Authentication/signin');
        }
      })
      .catch(() => {
        router.push('/Authentication/signin');
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      {children}
    </div>
  );
}
