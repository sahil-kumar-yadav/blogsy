"use client"
import { useState, useEffect } from "react"

export default function AdminNewsletter() {
    const [subs, setSubs] = useState([])

    useEffect(() => {
        async function loadSubs() {
            const res = await fetch("/api/newsletter")
            if (res.ok) {
                setSubs(await res.json())
            }
        }
        loadSubs()
    }, [])

    const handleDelete = async (id) => {
        await fetch(`/api/newsletter/${id}`, { method: "DELETE" })
        setSubs(subs.filter((s) => s.id !== id))
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
            <ul className="space-y-2">
                {subs.map((s) => (
                    <li
                        key={s.id}
                        className="p-4 border rounded-md flex justify-between items-center dark:border-gray-700"
                    >
                        <span>{s.email}</span>
                        <button
                            onClick={() => handleDelete(s.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded-md text-sm"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
