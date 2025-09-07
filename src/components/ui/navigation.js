"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icon library (lucide is already common in Next apps)
import styles from "./navigation.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Desktop Nav */}
      <ul className={`${styles.navList} hidden md:flex`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Nav Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="md:hidden p-2 rounded-md text-[var(--color-fg)] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <ul className="absolute right-4 top-16 bg-[var(--color-bg)] shadow-lg rounded-lg w-48 p-4 flex flex-col gap-2 animate-fadeIn">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-3 py-2 rounded-md hover:bg-[var(--color-accent)] hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
