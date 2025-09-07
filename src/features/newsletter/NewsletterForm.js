"use client"
import { useState } from "react"

export default function NewsletterForm() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(null) // "success" | "error" | null
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus("success")
                setMessage("✅ Thanks for subscribing!")
                setEmail("")
            } else {
                setStatus("error")
                setMessage(data.error || "Subscription failed.")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Something went wrong. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
            >
                Subscribe
            </button>
            {status && (
                <p
                    className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    )
}
