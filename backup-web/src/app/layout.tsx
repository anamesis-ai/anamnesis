import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Directorium',
  description: 'A directory and blog platform with live preview',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
