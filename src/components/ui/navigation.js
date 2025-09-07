import Link from "next/link"
import styles from "./navigation.module.css"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
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
