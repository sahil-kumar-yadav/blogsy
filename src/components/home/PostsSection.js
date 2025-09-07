import Heading from "@/shared/ui/Heading"
import Card from "@/shared/ui/Card"
import Button from "@/shared/ui/Button"
import Link from "next/link"

export default function PostsSection({ posts }) {
    return (
        <section className="space-y-6">
            <Heading level={2}>Latest Posts</Heading>
            <div className="grid gap-6 sm:grid-cols-2">
                {posts.slice(0, 3).map((post) => (
                    <Card key={post.id} className="transition-transform hover:scale-[1.02] hover:shadow-md">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-2xl font-semibold text-blue-600 hover:underline"
                        >
                            {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(post.date).toDateString()}
                        </p>
                        <p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
                        <div className="mt-4">
                            <Button asChild variant="outline">
                                <Link href={`/blog/${post.slug}`}>Read More</Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
