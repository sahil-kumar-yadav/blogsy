"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getPosts, deletePost } from "@/features/posts/service"

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts from Supabase
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        setError("Failed to load posts.")
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Delete post
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this post?")
    if (!ok) return

    try {
      const success = await deletePost(id)
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      alert("Failed to delete post. Please try again.")
    }
  }

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          ➕ New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No posts yet. Create your first one!
        </p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 border rounded-md dark:border-gray-700 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  slug: {post.slug}
                </p>
                {post.premium && (
                  <span className="text-xs text-yellow-600 font-medium">
                    ★ Premium
                  </span>
                )}
              </div>
              <div className="space-x-2">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
