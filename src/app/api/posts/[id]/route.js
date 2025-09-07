import { NextResponse } from "next/server"
import { getPost, updatePost, deletePost } from "@/features/posts/service"

export async function GET(req, { params }) {
    try {
        const post = await getPost(params.id)
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json()
        const { title, slug, content } = body

        const updated = await updatePost(params.id, { title, slug, content })
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await deletePost(params.id)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
