'use client';


import Link from 'next/link';
import Navigation from '../ui/navigation';


export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold">Next Blog</h1>
                <Navigation />
            </div>
        </header>

    );
}