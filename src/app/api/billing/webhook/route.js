import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
})

export async function POST(req) {
    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

        switch (event.type) {
            case "checkout.session.completed":
                console.log("✅ Checkout complete:", event.data.object.id)
                break
            case "invoice.payment_failed":
                console.log("❌ Payment failed")
                break
            default:
                console.log("Unhandled event:", event.type)
        }

        return NextResponse.json({ received: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 })
    }
}
