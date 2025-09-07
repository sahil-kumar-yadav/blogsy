import { NextResponse } from "next/server"
import prisma from "@/core/db/prisma"

export async function GET() {
    const customers = await prisma.customer.findMany({
        include: { subscriptions: true },
    })
    return NextResponse.json(customers)
}
