'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../app/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace('/Authentication/signin'); // force redirect
    } else {
      setChecked(true);
    }
  }, [router]);

  // Only render children if auth check passed
  if (!checked) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar + Header */}
      {children}
    </div>
  );
}
