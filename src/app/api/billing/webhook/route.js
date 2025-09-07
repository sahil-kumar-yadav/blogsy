import { NextResponse } from "next/server"
import Stripe from "stripe"
import prisma from "@/core/db/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Needed for raw body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req) {
  const rawBody = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object
        await prisma.subscription.upsert({
          where: { stripeId: subscription.id },
          update: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          create: {
            stripeId: subscription.id,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            customer: {
              connectOrCreate: {
                where: { stripeId: subscription.customer },
                create: {
                  stripeId: subscription.customer,
                  email: subscription.customer_email || "unknown@example.com",
                },
              },
            },
          },
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        await prisma.subscription.updateMany({
          where: { stripeId: subscription.id },
          data: { status: "canceled" },
        })
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    console.error("Error handling webhook:", err)
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
