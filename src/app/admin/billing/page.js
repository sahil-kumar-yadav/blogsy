"use client"

import { useEffect, useState } from "react"
import { Card } from "@/shared/ui/Card"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"

export default function BillingPage() {
  const [customers, setCustomers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])

  async function loadData() {
    const [c, s] = await Promise.all([
      fetch("/api/admin/billing/customers").then((res) => res.json()),
      fetch("/api/admin/billing/subscriptions").then((res) => res.json()),
    ])
    setCustomers(c)
    setSubscriptions(s)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleAction(id, action) {
    await fetch(`/api/admin/billing/subscriptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
    await loadData()
  }

  return (
    <div className="space-y-8">
      <Heading level={1}>Billing Management</Heading>

      {/* Customers */}
      <Card>
        <Heading level={2}>Customers</Heading>
        <table className="w-full mt-4 text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Email</th>
              <th>Stripe ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td>{c.email}</td>
                <td className="text-gray-500">{c.stripeId}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Subscriptions */}
      <Card>
        <Heading level={2}>Subscriptions</Heading>
        <table className="w-full mt-4 text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Customer</th>
              <th>Stripe ID</th>
              <th>Status</th>
              <th>Price</th>
              <th>Period End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id} className="border-b">
                <td>{s.customer?.email}</td>
                <td className="text-gray-500">{s.stripeId}</td>
                <td>{s.status}</td>
                <td>{s.priceId}</td>
                <td>{new Date(s.currentPeriodEnd).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAction(s.id, "cancel")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAction(s.id, "refresh")}
                  >
                    Refresh
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
