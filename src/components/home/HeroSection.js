import ButtonComponent from "@/shared/ui/Button"
import Heading from "@/shared/ui/Heading"
// import Button from "@/shared/ui/Button"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="text-center space-y-6">
            <Heading
                level={1}
                className="text-5xl sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
                Welcome to My Blog 🚀
            </Heading>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sharing posts, projects, and ideas about web development, design, and beyond.
            </p>
            <ButtonComponent variant="outline" asChild>
                <Link href="/blog">Explore the Blog</Link>
            </ButtonComponent>
        </section>
    )
}
