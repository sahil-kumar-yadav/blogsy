import Heading from "@/shared/ui/Heading"
import NewsletterForm from "@/features/newsletter/NewsletterForm"

export default function NewsletterSection() {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 shadow-lg">
            <div className="relative z-10 space-y-4 text-center">
                <Heading level={2} className="text-white">
                    Subscribe to the Newsletter
                </Heading>
                <p className="text-blue-100">
                    Stay up to date with the latest posts and projects.
                </p>
                <div className="max-w-md mx-auto">
                    <NewsletterForm />
                </div>
            </div>
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        </section>
    )
}
