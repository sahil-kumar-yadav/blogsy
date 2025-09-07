import prisma from "@/core/db/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
})

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