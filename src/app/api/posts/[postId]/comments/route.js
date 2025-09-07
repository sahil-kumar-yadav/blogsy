import { NextResponse } from "next/server"
import { getComments, createComment } from "@/features/comments/service"

export async function GET(req, { params }) {
    try {
        const comments = await getComments(params.postId)
        return NextResponse.json(comments)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req, { params }) {
    try {
        const body = await req.json()
        const { author, content } = body

        if (!author || !content) {
            return NextResponse.json(
                { error: "Author and content required" },
                { status: 400 }
            )
        }

        const comment = await createComment({
            postId: params.postId,
            author,
            content,
        })

        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
