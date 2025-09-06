import SubscribeForm from "../../features/newsletter/SubscribeForm"
import Heading from "../../shared/ui/Heading"

export const metadata = {
    title: "Newsletter",
}

export default function NewsletterPage() {
    return (
        <section className="space-y-6">
            <Heading level={1}>Join the Newsletter</Heading>
            <p className="text-gray-600 dark:text-gray-400">
                Get the latest blog posts, project updates, and resources straight to your inbox.
            </p>
            <SubscribeForm />
        </section>
    )
}
