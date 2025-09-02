"use client";
import type React from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
      <style jsx global>{`
        body {
          margin: 0;
          font-size: 16px;
          font-family: Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
}
