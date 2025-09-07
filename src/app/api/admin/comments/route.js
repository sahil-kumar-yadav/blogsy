import { NextResponse } from "next/server"
import prisma from "@/core/db/prisma"

export async function GET() {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(comments)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
