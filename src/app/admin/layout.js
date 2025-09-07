export const metadata = {
  title: "Admin Dashboard",
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <nav className="space-x-4">
          <a href="/admin/posts">Posts</a>
          <a href="/admin/projects">Projects</a>
          <a href="/admin/comments">Comments</a>
          <a href="/admin/newsletter">Newsletter</a>
          <a href="/admin/billing">Billing</a>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  )
}
