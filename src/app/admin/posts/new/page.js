"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createPost } from "@/features/posts/service"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createPost({ title, slug, content })
      router.push("/admin/posts")
    } catch (err) {
      setError("Failed to create post. Please try again.")
    } finally {
      setLoading(false)
    }
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
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </section>
  )
}
