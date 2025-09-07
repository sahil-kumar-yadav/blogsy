"use client"
import { useState } from "react"
import Button from "@/shared/ui/Button"

export default function PricingTable({ products }) {
    const [loading, setLoading] = useState(false)

    const handleCheckout = async (priceId) => {
        setLoading(true)
        const res = await fetch("/api/billing/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priceId }),
        })
        const data = await res.json()
        if (data.url) window.location.href = data.url
        setLoading(false)
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
                <div
                    key={p.id}
                    className="p-6 border rounded-lg shadow-sm dark:border-gray-700"
                >
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {p.description || "Premium plan"}
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        ${(p.price?.unit_amount / 100).toFixed(2)} /{" "}
                        {p.price?.recurring?.interval}
                    </p>
                    <Button
                        onClick={() => handleCheckout(p.price.id)}
                        className="mt-4 w-full"
                        disabled={loading}
                    >
                        {loading ? "Redirecting..." : "Subscribe"}
                    </Button>
                </div>
            ))}
        </div>
    )
}
