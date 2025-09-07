import { NextResponse } from "next/server"
import {
    getComment,
    updateComment,
    deleteComment,
} from "@/features/comments/service"

export async function GET(req, { params }) {
    try {
        const comment = await getComment(params.id)
        if (!comment) {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 })
        }
        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json()
        const { content } = body

        const updated = await updateComment(params.id, { content })
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await deleteComment(params.id)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
