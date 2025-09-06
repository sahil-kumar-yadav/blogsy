"use client"
import { useState } from "react"

export default function CommentBox({ onCommentAdded }) {
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, text }),
            })

            if (!res.ok) throw new Error("Failed to add comment")

            const newComment = await res.json()
            onCommentAdded(newComment)
            setName("")
            setText("")
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-800"
            />
            <textarea
                required
                placeholder="Your comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-800"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Posting..." : "Post Comment"}
            </button>

            {error && <p className="text-red-600">{error}</p>}
        </form>
    )
}
