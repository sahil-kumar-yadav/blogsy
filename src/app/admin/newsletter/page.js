"use client"
import { useEffect, useState } from "react"

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([])

  async function loadSubs() {
    const res = await fetch("/api/admin/newsletter")
    setSubs(await res.json())
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" })
    setSubs(subs.filter((s) => s.id !== id))
  }

  useEffect(() => {
    loadSubs()
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-bold">Manage Newsletter Subscribers</h1>
      <ul className="mt-6 space-y-2">
        {subs.map((s) => (
          <li key={s.id} className="flex justify-between items-center border p-3 rounded-md">
            <span>{s.email}</span>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(s.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
