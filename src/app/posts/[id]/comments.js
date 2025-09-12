"use client"
import { useEffect, useState } from "react"
import { getComments, deleteComment } from "@/features/comments/service"

export default function AdminComments() {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadComments() {
            // maybe show all comments across posts
            const data = await getComments()
            setComments(data || [])
            setLoading(false)
        }
        loadComments()
    }, [])

    const handleDelete = async (id) => {
        const ok = confirm("Delete this comment?")
        if (!ok) return
        await deleteComment(id)
        setComments((prev) => prev.filter((c) => c.id !== id))
    }

    if (loading) return <p>Loading comments...</p>

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Comments</h1>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul className="space-y-2">
                    {comments.map((c) => (
                        <li key={c.id} className="p-4 border rounded-md dark:border-gray-700">
                            <p className="font-semibold">{c.author}</p>
                            <p className="text-sm">{c.content}</p>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="mt-2 px-2 py-1 bg-red-600 text-white rounded-md text-sm"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
