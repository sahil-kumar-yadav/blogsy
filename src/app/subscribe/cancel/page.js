import { Heading } from "@/shared/ui/Heading"

export default function CancelPage() {
  return (
    <div className="max-w-xl mx-auto py-20 text-center space-y-6">
      <Heading level={1}>❌ Subscription Cancelled</Heading>
      <p className="text-gray-600 dark:text-gray-300">
        Your subscription process was cancelled. You can try again anytime.
      </p>
    </div>
  )
}
