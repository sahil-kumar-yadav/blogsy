"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createPost } from "../../../../features/admin/posts/dataStore"

export default function NewPostPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [body, setBody] = useState("")
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        createPost({
            title,
            slug: title.toLowerCase().replace(/\s+/g, "-"),
            date: new Date().toISOString().split("T")[0],
            description,
            body,
        })
        router.push("/admin/posts")
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <textarea
                    required
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 h-40"
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
