'use client';


import Link from 'next/link';
import Navigation from '../ui/navigation';


export default function Header() {
    return (
        <header className="site-header">
            <div className="container">
                <h1 style={{ margin: 0, fontSize: '1.25rem' }}>
                    <Link href="/">My Blog</Link>
                </h1>
                <Navigation />
            </div>
        </header>
    );
}