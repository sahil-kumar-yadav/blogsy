"use client"
import { useEffect, useState } from "react"

export default function CommentList({ newComment }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function fetchComments() {
            const res = await fetch("/api/comments")
            const data = await res.json()
            setComments(data)
        }
        fetchComments()
    }, [])

    // Append new comment when added
    useEffect(() => {
        if (newComment) {
            setComments((prev) => [...prev, newComment])
        }
    }, [newComment])

    return (
        <div className="space-y-4">
            {comments.length === 0 && (
                <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
            )}
            {comments.map((c) => (
                <div
                    key={c.id}
                    className="p-3 border rounded-md dark:border-gray-700"
                >
                    <p className="font-semibold">{c.name}</p>
                    <p>{c.text}</p>
                </div>
            ))}
        </div>
    )
}
