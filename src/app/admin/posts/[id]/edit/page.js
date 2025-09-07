"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function EditPostPage() {
    const router = useRouter()
    const params = useParams()
    const postId = params.id
    const [post, setPost] = useState(null)

    // Fetch single post
    useEffect(() => {
        async function loadPost() {
            const res = await fetch(`/api/posts/${postId}`)
            if (res.ok) {
                setPost(await res.json())
            }
        }
        loadPost()
    }, [postId])

    if (!post) return <p>Loading...</p>

    // Update post
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        })
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Update
                </button>
            </form>
        </section>
    )
}
