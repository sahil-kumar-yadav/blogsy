import prisma from "@/core/db/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

// --- Sync Helpers (used in webhooks) ---

export async function upsertCustomer(stripeCustomer) {
  return prisma.customer.upsert({
    where: { stripeId: stripeCustomer.id },
    update: { email: stripeCustomer.email },
    create: {
      stripeId: stripeCustomer.id,
      email: stripeCustomer.email,
    },
  })
}

export async function upsertSubscription(stripeSub) {
  return prisma.subscription.upsert({
    where: { stripeId: stripeSub.id },
    update: {
      status: stripeSub.status,
      priceId: stripeSub.items.data[0].price.id,
      currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
      customer: {
        connect: { stripeId: stripeSub.customer },
      },
    },
    create: {
      stripeId: stripeSub.id,
      status: stripeSub.status,
      priceId: stripeSub.items.data[0].price.id,
      currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
      customer: {
        connect: { stripeId: stripeSub.customer },
      },
    },
  })
}

// --- Query Helpers (used in Admin UI) ---

export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getSubscriptions() {
  return prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  })
}

// --- Actions (used in Admin UI) ---

export async function updateSubscription(id, action) {
  const subscription = await prisma.subscription.findUnique({ where: { id } })
  if (!subscription) throw new Error("Subscription not found")

  if (action === "cancel") {
    // Cancel at period end in Stripe
    await stripe.subscriptions.update(subscription.stripeId, {
      cancel_at_period_end: true,
    })
    return prisma.subscription.update({
      where: { id },
      data: { status: "canceled" },
    })
  }

  if (action === "refresh") {
    // Pull latest data from Stripe
    const latest = await stripe.subscriptions.retrieve(subscription.stripeId)
    return upsertSubscription(latest)
  }

  throw new Error(`Unknown action: ${action}`)
}

// --- User Helper (for premium gating) ---

export async function userHasActiveSubscription(userId) {
  if (!userId) return false

  const sub = await prisma.subscription.findFirst({
    where: {
      customer: { id: userId },
      status: "active",
    },
  })

  return Boolean(sub)
}
