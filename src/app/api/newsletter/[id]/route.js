import { NextResponse } from "next/server"
import { deleteSubscriber } from "@/features/subscribers/service"

export async function DELETE(req, { params }) {
    try {
        await deleteSubscriber(params.id)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
