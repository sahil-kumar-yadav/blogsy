import { notFound, redirect } from "next/navigation"
import CommentsSection from "@/features/comments/CommentsSection"
import { userHasActiveSubscription } from "@/features/billing/service"
import { getPostBySlug } from "@/features/posts/service"
import Heading from "@/components/shared/Heading"
import Card from "@/components/shared/Card"
import Link from "next/link"

export default async function BlogPostPage({ params }) {
  const slug = params.slug
  const post = await getPostBySlug(slug)

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
    <article className="site-main">
      {/* Hero Section */}
      <header className="mb-10 text-center space-y-4">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
          />
        )}
        <Heading level={1} align="center" animated>
          {post.title}
        </Heading>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
          <time>
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.premium && (
            <span className="px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-md">
              Premium
            </span>
          )}
        </div>
      </header>

      {/* Post Body */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p className="text-gray-600 italic">No content available.</p>
        )}
      </div>

      {/* Comments */}
      <Card className="mt-12">
        <Heading level={3} className="mb-4">
          Comments
        </Heading>
        <CommentsSection postId={post.id} />
      </Card>

      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
}
