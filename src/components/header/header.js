"use client";

import Link from "next/link";
import Navigation from "../ui/navigation";

export default function Header() {
  return (
    <header className="site-header shadow-sm">
      <div className="container">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
        >
          Blogsy
        </Link>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
}
