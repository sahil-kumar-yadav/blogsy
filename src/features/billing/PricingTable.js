"use client";
import { useState } from "react";
import Button from "@/shared/ui/Button";

export default function PricingTable({ products }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId) => {
    setLoading(true);
    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, idx) => {
        const isPopular = idx === 1; // highlight the middle plan
        return (
          <div
            key={p.id}
            className={`relative flex flex-col p-8 rounded-2xl shadow-md border bg-white dark:bg-gray-900 dark:border-gray-700 transition-transform hover:scale-[1.03] hover:shadow-xl ${
              isPopular ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {/* Popular Badge */}
            {isPopular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            {/* Plan Name */}
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {p.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {p.description || "Premium plan with exclusive features"}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                ${(p.price?.unit_amount / 100).toFixed(2)}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                /{p.price?.recurring?.interval}
              </span>
            </div>

            {/* Subscribe Button */}
            <Button
              onClick={() => handleCheckout(p.price.id)}
              className="w-full mt-auto"
              disabled={loading}
              variant={isPopular ? "primary" : "outline"}
            >
              {loading ? "Redirecting..." : "Subscribe"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
