// src/features/billing/service.js

import supabase from "@/core/supabase/client"
import Stripe from "stripe"

// Lazy Stripe instance
let stripeInstance = null

function getStripe() {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.")
    }

    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  }

  return stripeInstance
}

/* -------------------------------------------------
   Sync Helpers (used in Stripe webhooks)
-------------------------------------------------- */

export async function upsertCustomer(stripeCustomer) {
  if (!stripeCustomer?.id) throw new Error("Invalid Stripe customer payload")

  // Try to update first
  const { data: existing } = await supabase
    .from("customers")
    .select("*")
    .eq("stripe_id", stripeCustomer.id)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from("customers")
      .update({ email: stripeCustomer.email ?? null })
      .eq("stripe_id", stripeCustomer.id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  // Create new
  const { data, error } = await supabase
    .from("customers")
    .insert({
      stripe_id: stripeCustomer.id,
      email: stripeCustomer.email ?? null,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function upsertSubscription(stripeSub) {
  if (!stripeSub?.id) throw new Error("Invalid Stripe subscription payload")

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("stripe_id", stripeSub.id)
    .single()

  const subPayload = {
    status: stripeSub.status,
    price_id: stripeSub.items?.data?.[0]?.price?.id ?? null,
    current_period_end: new Date(stripeSub.current_period_end * 1000).toISOString(),
    customer_stripe_id: stripeSub.customer,
  }

  if (existing) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update(subPayload)
      .eq("stripe_id", stripeSub.id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({ stripe_id: stripeSub.id, ...subPayload })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

/* -------------------------------------------------
   Query Helpers (used in Admin UI)
-------------------------------------------------- */

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getSubscriptions() {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, customers(*)")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

/* -------------------------------------------------
   Admin Actions
-------------------------------------------------- */

export async function updateSubscription(id, action) {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !subscription) throw new Error("Subscription not found")

  const stripe = getStripe()

  if (action === "cancel") {
    await stripe.subscriptions.update(subscription.stripe_id, {
      cancel_at_period_end: true,
    })

    const { data, error: updateErr } = await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("id", id)
      .select()
      .single()

    if (updateErr) throw new Error(updateErr.message)
    return data
  }

  if (action === "refresh") {
    const latest = await stripe.subscriptions.retrieve(subscription.stripe_id)
    return upsertSubscription(latest)
  }

  throw new Error(`Unknown action: ${action}`)
}

/* -------------------------------------------------
   User Helpers (for premium gating)
-------------------------------------------------- */

export async function userHasActiveSubscription(userId) {
  if (!userId) return false

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("customer_stripe_id", userId)
    .eq("status", "active")
    .limit(1)
    .single()

  if (error) throw new Error(error.message)
  return Boolean(data)
}
