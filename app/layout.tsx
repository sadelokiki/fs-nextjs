import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type React from 'react';
import { Layout } from '../components/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
