"use client"

import { useState } from "react"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"

export default function SubscribePage() {
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          userId: "demo-user-id", // TODO: wire with session when auth added
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-20 text-center space-y-6">
      <Heading level={1}>Go Premium ✨</Heading>
      <p className="text-gray-600 dark:text-gray-300">
        Unlock premium posts and projects with a subscription.
      </p>
      <Button size="lg" onClick={handleSubscribe} disabled={loading}>
        {loading ? "Redirecting..." : "Subscribe Now"}
      </Button>
    </div>
  )
}
