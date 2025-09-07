import { Home, FileText, FolderKanban, MessageSquare, Mail, CreditCard } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({ children }) {
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Comments", href: "/admin/comments", icon: MessageSquare },
    { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { name: "Billing", href: "/admin/billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight">⚡ Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          © 2025 Admin Panel
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
