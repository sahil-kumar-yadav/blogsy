import { allPosts } from "contentlayer/generated"
import { notFound, redirect } from "next/navigation"
import CommentsSection from "../../../features/comments/CommentsSection"
import MDXRenderer from "../../../components/MDXRenderer"
import { userHasActiveSubscription } from "@/features/billing/service"

// ✅ Static params for pre-render
export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug.replace(/\.mdx$/, "") }))
}

export default async function BlogPostPage({ params }) {
  const slug = params.slug
  const post = allPosts.find((post) => post.slug.replace(/\.mdx$/, "") === slug)

  if (!post) return notFound()

  // 🔒 Premium gating logic
  if (post.premium) {
    // TODO: Replace with real session.user.id once Auth is wired in
    const userId = null
    const hasAccess = await userHasActiveSubscription(userId)

    if (!hasAccess) {
      redirect("/subscribe")
    }
  }

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <MDXRenderer code={post.body.code} />
      <div className="mt-12">
        <CommentsSection />
      </div>
    </article>
  )
}
