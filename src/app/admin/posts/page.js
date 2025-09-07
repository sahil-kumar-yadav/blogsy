"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AdminPosts() {
  const [posts, setPosts] = useState([])

  // Fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      const res = await fetch("/api/posts")
      const data = await res.json()
      setPosts(data)
    }
    loadPosts()
  }, [])

  // Delete post
  const handleDelete = async (id) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-3 py-2 bg-green-600 text-white rounded-md"
        >
          ➕ New Post
        </Link>
      </div>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded-md dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  slug: {post.slug}
                </p>
              </div>
              <div className="space-x-2">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
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
