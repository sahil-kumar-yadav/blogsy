import { NextResponse } from "next/server"
import prisma from "@/core/db/prisma"

export async function GET() {
    const subscriptions = await prisma.subscription.findMany({
        include: { customer: true },
    })
    return NextResponse.json(subscriptions)
}
