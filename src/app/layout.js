import "./globals.css";
import Header from "@/components/header/header";

export const metadata = {
  title: "Blogsy",
  description: "Next generation Blog app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] transition-colors duration-300">
        {/* Accessibility: skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--color-accent)] text-white px-4 py-2 rounded-md shadow-md"
        >
          Skip to content
        </a>

        {/* Sticky Header */}
        <Header />

        {/* Main Content */}
        <main
          id="main-content"
          className="site-main fade-in-up"
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Blogsy. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
