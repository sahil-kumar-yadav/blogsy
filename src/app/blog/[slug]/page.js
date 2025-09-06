import { allPosts } from "contentlayer/generated"
import { notFound } from "next/navigation"
import CommentsSection from "../../../features/comments/CommentsSection"

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />

      {/* Comments */}
      <div className="mt-12">
        <CommentsSection />
      </div>
    </article>
  )
}
