import { getStripeProducts } from "@/features/billing/service"
import PricingTable from "@/features/billing/PricingTable"
import Heading from "@/shared/ui/Heading"

export default async function BillingPage() {
    const products = await getStripeProducts()

    return (
        <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
            <Heading level={1}>Choose Your Plan 💳</Heading>
            <p className="text-gray-600 dark:text-gray-400">
                Unlock premium content and support the blog.
            </p>
            <PricingTable products={products} />
        </main>
    )
}
