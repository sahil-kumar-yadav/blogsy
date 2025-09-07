import { NextResponse } from "next/server"
import { createCheckoutSession } from "@/features/billing/service"

export async function POST(req) {
    try {
        const { priceId } = await req.json()
        const session = await createCheckoutSession({
            priceId,
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
            cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
