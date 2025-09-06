import Link from "next/link"
import styles from "./navigation.module.css"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/about/projects", label: "Projects" },
]

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
