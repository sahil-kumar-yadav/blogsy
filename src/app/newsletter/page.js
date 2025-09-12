"use client"
import { useState } from "react"
import { addSubscriber } from "@/features/newsletter/service"

export default function NewsletterPage() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addSubscriber(email)
            setStatus("Subscribed successfully 🎉")
            setEmail("")
        } catch (err) {
            setStatus(err.message)
        }
    }

    return (
        <section className="space-y-6 max-w-md">
            <h1 className="text-2xl font-bold">Join our Newsletter</h1>
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 p-2 border rounded-md dark:bg-gray-800"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Subscribe
                </button>
            </form>
            {status && <p className="text-sm text-green-600">{status}</p>}
        </section>
    )
}
