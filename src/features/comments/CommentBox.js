"use client"
import { useState } from "react"
import { createComment } from "./service"

export default function CommentBox({ postId, onCommentAdded }) {
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const newComment = await createComment({ postId, author, content })
      if (!newComment) throw new Error("Failed to add comment")

      onCommentAdded(newComment)
      setAuthor("")
      setContent("")
    } catch (err) {
      console.error(err)
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
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        required
        placeholder="Your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}
