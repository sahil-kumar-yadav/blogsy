// src/app/api/admin/billing/subscriptions/[id]/route.js
import { NextResponse } from "next/server"
import supabaseServer from "@/core/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

// PATCH /api/admin/billing/subscriptions/[id]
// Body: { action: "cancel" | "refresh" }
export async function PATCH(req, { params }) {
  const { id } = params
  const supabase = supabaseServer()
  const { action } = await req.json()

  // Find subscription in Supabase
  const { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single()

  if (subError || !subscription) {
    return NextResponse.json(
      { error: subError?.message || "Subscription not found" },
      { status: 404 }
    )
  }

  try {
    if (action === "cancel") {
      // Cancel in Stripe
      await stripe.subscriptions.update(subscription.stripe_id, {
        cancel_at_period_end: true,
      })

      // Update in Supabase
      const { data, error } = await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    if (action === "refresh") {
      // Pull latest from Stripe
      const latest = await stripe.subscriptions.retrieve(subscription.stripe_id)

      const { data, error } = await supabase
        .from("subscriptions")
        .update({
          status: latest.status,
          price_id: latest.items.data[0].price.id,
          current_period_end: new Date(latest.current_period_end * 1000).toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
