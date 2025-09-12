"use client"
import { useEffect, useState } from "react"
import { getSubscribers, deleteSubscriber } from "@/features/newsletter/service"

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubs() {
      const data = await getSubscribers()
      setSubs(data)
      setLoading(false)
    }
    loadSubs()
  }, [])

  const handleDelete = async (id) => {
    const ok = confirm("Delete this subscriber?")
    if (!ok) return
    await deleteSubscriber(id)
    setSubs((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) return <p>Loading subscribers...</p>

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
      {subs.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <ul className="space-y-2">
          {subs.map((s) => (
            <li key={s.id} className="flex justify-between p-2 border rounded-md">
              <span>{s.email}</span>
              <button
                onClick={() => handleDelete(s.id)}
                className="px-2 py-1 bg-red-600 text-white rounded-md text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
