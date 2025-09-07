'use client';

import Link from 'next/link';
import Navigation from '../ui/navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Next Blog
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
