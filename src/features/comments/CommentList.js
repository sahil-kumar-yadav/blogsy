"use client"
import { useEffect, useState } from "react"
import { getComments } from "./service"

export default function CommentList({ postId, newComment }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      setLoading(true)
      const data = await getComments(postId)
      setComments(data)
      setLoading(false)
    }
    if (postId) fetchComments()
  }, [postId])

  // Append new comment optimistically
  useEffect(() => {
    if (newComment) {
      setComments((prev) => [newComment, ...prev])
    }
  }, [newComment])

  if (loading) {
    return <p className="text-gray-500">Loading comments...</p>
  }

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
          <p className="font-semibold">{c.author}</p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  )
}
