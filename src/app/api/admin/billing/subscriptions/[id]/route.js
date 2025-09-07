import { NextResponse } from "next/server"
import prisma from "@/core/db/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function PATCH(req, { params }) {
    const { id } = params
    const { action } = await req.json()

    const subscription = await prisma.subscription.findUnique({ where: { id } })
    if (!subscription) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (action === "cancel") {
        // Cancel on Stripe
        await stripe.subscriptions.update(subscription.stripeId, { cancel_at_period_end: true })

        // Update local DB
        await prisma.subscription.update({
            where: { id },
            data: { status: "canceled" },
        })

        return NextResponse.json({ success: true })
    }

    if (action === "refresh") {
        const stripeSub = await stripe.subscriptions.retrieve(subscription.stripeId, {
            expand: ["customer"],
        })

        await prisma.subscription.update({
            where: { id },
            data: {
                status: stripeSub.status,
                currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
            },
        })

        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
