"use client"

import { useEffect, useState } from "react"
import ButtonComponent from "@/shared/ui/Button"
import CardComponent from "@/shared/ui/Card"
import Heading from "@/shared/ui/Heading"
import {
  getCustomers,
  getSubscriptions,
  updateSubscription,
} from "@/features/billing/service"



export default function BillingPage() {
  const [customers, setCustomers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    setLoading(true)
    const [c, s] = await Promise.all([getCustomers(), getSubscriptions()])
    setCustomers(c)
    setSubscriptions(s)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleAction(id, action) {
    await updateSubscription(id, action)
    await loadData()
  }

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading billing data...</p>
  }

  return (
    <div className="space-y-8">
      <Heading level={1}>Billing Management</Heading>

      {/* Customers */}
      <CardComponent>
        <Heading level={2}>Customers</Heading>
        {customers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            No customers found.
          </p>
        ) : (
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
        )}
      </CardComponent>

      {/* Subscriptions */}
      <CardComponent>
        <Heading level={2}>Subscriptions</Heading>
        {subscriptions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            No subscriptions found.
          </p>
        ) : (
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
                  <td>
                    {s.currentPeriodEnd
                      ? new Date(s.currentPeriodEnd).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="space-x-2">
                    <ButtonComponent
                      variant="danger"
                      size="sm"
                      onClick={() => handleAction(s.id, "cancel")}
                    >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAction(s.id, "refresh")}
                    >
                      Refresh
                    </ButtonComponent>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardComponent>
    </div>
  )
}
