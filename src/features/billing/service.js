import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
})

export async function createCheckoutSession({ priceId, successUrl, cancelUrl }) {
    return await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
    })
}

export async function getStripeProducts() {
    const products = await stripe.products.list({ active: true })
    const prices = await stripe.prices.list({ active: true })

    return products.data.map((product) => {
        const price = prices.data.find((p) => p.product === product.id)
        return { ...product, price }
    })
}
