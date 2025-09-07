import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"

export default function SubscribePage() {
  return (
    <div className="max-w-xl mx-auto py-20 text-center space-y-6">
      <Heading level={1}>Go Premium ✨</Heading>
      <p className="text-gray-600 dark:text-gray-300">
        Unlock premium posts and projects with a subscription.
      </p>
      <Button size="lg" onClick={() => alert("TODO: Stripe checkout flow")}>
        Subscribe Now
      </Button>
    </div>
  )
}
