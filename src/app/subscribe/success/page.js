import { Heading } from "@/shared/ui/Heading"

export default function SuccessPage() {
    return (
        <div className="max-w-xl mx-auto py-20 text-center space-y-6">
            <Heading level={1}>🎉 Subscription Successful!</Heading>
            <p className="text-gray-600 dark:text-gray-300">
                Thank you for subscribing. You now have access to all premium content.
            </p>
        </div>
    )
}
