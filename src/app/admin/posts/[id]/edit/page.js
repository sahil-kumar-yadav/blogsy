"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getPost, updatePost } from "../../../../../features/admin/posts/dataStore"

export default function EditPostPage() {
    const router = useRouter()
    const params = useParams()
    const postId = params.id
    const [post, setPost] = useState(null)

    useEffect(() => {
        setPost(getPost(postId))
    }, [postId])

    if (!post) return <p>Loading...</p>

    const handleSubmit = (e) => {
        e.preventDefault()
        updatePost(postId, post)
        router.push("/admin/posts")
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
                <textarea
                    value={post.description}
                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <textarea
                    value={post.body}
                    onChange={(e) => setPost({ ...post, body: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 h-40"
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
