"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getPost, updatePost } from "@/features/posts/service"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Fetch single post from Supabase
  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPost(postId)
        setPost(data)
      } catch (err) {
        setError("Failed to load post.")
      } finally {
        setLoading(false)
      }
    }
    if (postId) loadPost()
  }, [postId])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!post) return <p>Post not found.</p>

  // Update post
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await updatePost(postId, {
        title: post.title,
        slug: post.slug,
        content: post.content,
      })
      router.push("/admin/posts")
    } catch (err) {
      setError("Failed to update post. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <input
          type="text"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </section>
  )
}
