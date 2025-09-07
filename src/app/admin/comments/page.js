"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminComments() {
    const [comments, setComments] = useState([])

    // Fetch comments across all posts
    useEffect(() => {
        async function loadComments() {
            const res = await fetch("/api/admin/comments") // custom API endpoint (see below if needed)
            if (res.ok) {
                setComments(await res.json())
            }
        }
        loadComments()
    }, [])

    // Delete a comment
    const handleDelete = async (postId, id) => {
        await fetch(`/api/posts/${postId}/comments/${id}`, { method: "DELETE" })
        setComments(comments.filter((c) => c.id !== id))
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Comments</h1>
            <ul className="space-y-2">
                {comments.map((c) => (
                    <li key={c.id} className="p-4 border rounded-md dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{c.author}</p>
                                <p className="text-sm">{c.content}</p>
                                <p className="text-xs text-gray-500">Post ID: {c.postId}</p>
                            </div>
                            <div className="space-x-2">
                                <Link
                                    href={`/admin/comments/${c.id}/edit`}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-md text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(c.postId, c.id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded-md text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
