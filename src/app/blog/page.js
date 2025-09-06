import { allPosts } from "contentlayer/generated"
import Link from "next/link"
import Heading from "../../shared/ui/Heading"
import Card from "../../shared/ui/Card"

export const metadata = {
  title: "Blog",
}

export default function BlogPage() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <section className="space-y-6">
      <Heading level={1}>Blog</Heading>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toDateString()}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
