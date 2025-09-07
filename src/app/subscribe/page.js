"use client";

import { useEffect, useState } from "react";
import Heading from "@/shared/ui/Heading";
import PricingTable from "@/features/billing/PricingTable";

export default function SubscribePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from our API route
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/billing/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-center space-y-10">
      {/* Hero Section */}
      <div className="space-y-4">
        <Heading level={1}>Go Premium ✨</Heading>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Unlock exclusive blog posts, advanced tutorials, and featured projects with one of our flexible subscription plans.
        </p>
      </div>

      {/* Pricing Plans */}
      {loading ? (
        <p className="text-gray-500">Loading plans...</p>
      ) : products.length > 0 ? (
        <PricingTable products={products} />
      ) : (
        <p className="text-red-500">No plans available. Please check Stripe setup.</p>
      )}

      {/* Extra Guarantee */}
      <div className="pt-10 text-sm text-gray-500">
        Cancel anytime. No hidden fees.
      </div>
    </div>
  );
}
