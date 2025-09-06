"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createProject } from "../../../../features/admin/projects/dataStore"

export default function NewProjectPage() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        createProject({
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
            description,
            link,
        })
        router.push("/admin/projects")
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Create New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="text"
                    required
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <input
                    type="url"
                    placeholder="Project Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Save
                </button>
            </form>
        </section>
    )
}
