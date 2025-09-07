"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function EditCommentPage() {
    const router = useRouter()
    const params = useParams()
    const commentId = params.id
    const [comment, setComment] = useState(null)

    useEffect(() => {
        async function loadComment() {
            const res = await fetch(`/api/admin/comments/${commentId}`)
            if (res.ok) setComment(await res.json())
        }
        loadComment()
    }, [commentId])

    if (!comment) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`/api/posts/${comment.postId}/comments/${comment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: comment.content }),
        })
        router.push("/admin/comments")
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Edit Comment</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="text"
                    value={comment.author}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                />
                <textarea
                    value={comment.content}
                    onChange={(e) => setComment({ ...comment, content: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Update
                </button>
            </form>
        </section>
    )
}
