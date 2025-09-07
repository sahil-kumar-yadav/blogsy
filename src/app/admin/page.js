import { FileText, FolderKanban, Mail, MessageSquare, CreditCard } from "lucide-react";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Posts",
      desc: "Create, edit, and delete blog posts.",
      icon: FileText,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Projects",
      desc: "Manage your project portfolio.",
      icon: FolderKanban,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      title: "Comments",
      desc: "Review and moderate user comments.",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Newsletter",
      desc: "See who subscribed to updates.",
      icon: Mail,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
    },
    {
      title: "Billing",
      desc: "Manage subscriptions and payments.",
      icon: CreditCard,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your blog, projects, and subscribers from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(({ title, desc, icon: Icon, color }) => (
          <div
            key={title}
            className="p-6 rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color} mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
