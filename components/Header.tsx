"use client";
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header(): React.ReactElement {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <nav>
      <Link href="/" className={isActive('/') ? 'active' : ''}>
        <b>Journal</b>
      </Link>
      <style jsx>{`
        nav {
          padding: 2rem;
        }
      `}</style>
    </nav>
  );
}
