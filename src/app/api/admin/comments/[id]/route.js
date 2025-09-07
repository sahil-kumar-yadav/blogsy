import { NextResponse } from "next/server"
import prisma from "@/core/db/prisma"

export async function GET(req, { params }) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: Number(params.id) },
        })
        if (!comment) {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 })
        }
        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
