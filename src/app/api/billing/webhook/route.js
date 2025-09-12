// src/app/api/billing/webhook/route.js
import { NextResponse } from "next/server"
import Stripe from "stripe"
import supabaseServer from "@/core/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

// Stripe requires the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = supabaseServer()

  try {
    switch (event.type) {
      case "customer.created": {
        const customer = event.data.object
        await supabase.from("customers").upsert({
          stripe_id: customer.id,
          email: customer.email,
        })
        break
      }

      case "customer.updated": {
        const customer = event.data.object
        await supabase.from("customers").update({
          email: customer.email,
        }).eq("stripe_id", customer.id)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object
        await supabase.from("subscriptions").upsert({
          stripe_id: subscription.id,
          status: subscription.status,
          price_id: subscription.items.data[0].price.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          customer_stripe_id: subscription.customer, // link to customers table
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        await supabase.from("subscriptions").update({
          status: "canceled",
        }).eq("stripe_id", subscription.id)
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
