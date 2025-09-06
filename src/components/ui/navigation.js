'use client';


import Link from 'next/link';
import styles from './navigation.module.css';


export default function Navigation() {
    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <Link className={styles.link} href="/">Home</Link>
            <Link className={styles.link} href="/blog">Blog</Link>
            <Link className={styles.link} href="/about">About</Link>
        </nav>
    );
}