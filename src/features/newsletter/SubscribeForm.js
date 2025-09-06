"use client"
import { useState } from "react"

export default function SubscribeForm() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            if (!res.ok) throw new Error("Failed to subscribe")
            setStatus("success")
            setEmail("")
        } catch (err) {
            console.error(err)
            setStatus("error")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-800"
            />
            <button
                type="submit"
                disabled={status === "loading"}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>

            {status === "success" && (
                <p className="text-green-600">✅ Subscribed successfully!</p>
            )}
            {status === "error" && (
                <p className="text-red-600">❌ Something went wrong. Try again.</p>
            )}
        </form>
    )
}
