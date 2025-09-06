export default function AdminDashboard() {
    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">
                Manage your blog, projects, and subscribers from here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
                    <h2 className="font-semibold text-lg">Posts</h2>
                    <p className="text-sm">Create, edit, and delete blog posts.</p>
                </div>
                <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
                    <h2 className="font-semibold text-lg">Projects</h2>
                    <p className="text-sm">Manage your project portfolio.</p>
                </div>
                <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
                    <h2 className="font-semibold text-lg">Newsletter</h2>
                    <p className="text-sm">See who subscribed to updates.</p>
                </div>
            </div>
        </section>
    )
}
