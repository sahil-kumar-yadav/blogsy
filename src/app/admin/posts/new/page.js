"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewPostPage() {
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, slug, content }),
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
                <input
                    type="text"
                    required
                    placeholder="Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <textarea
                    required
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
