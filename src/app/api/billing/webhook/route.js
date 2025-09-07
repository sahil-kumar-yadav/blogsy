import { NextResponse } from "next/server"
import Stripe from "stripe"
import { upsertCustomer, upsertSubscription } from "@/features/billing/service"

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
      case "customer.created":
      case "customer.updated":
        await upsertCustomer(event.data.object)
        break

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await upsertSubscription(event.data.object)
        break

      case "customer.subscription.deleted":
        await upsertSubscription({
          ...event.data.object,
          status: "canceled",
        })
        break

      default:
        console.log("Unhandled event:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("❌ Webhook error:", err.message)
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 })
  }
}
