import { allPosts } from "contentlayer/generated";
import { notFound, redirect } from "next/navigation";
import CommentsSection from "../../../features/comments/CommentsSection";
import MDXRenderer from "../../../components/MDXRenderer";
import { userHasActiveSubscription } from "@/features/billing/service";
import Heading from "@/shared/ui/Heading";
import Card from "@/shared/ui/Card";
import Link from "next/link";

// ✅ Static params for pre-render
export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug.replace(/\.mdx$/, "") }));
}

export default async function BlogPostPage({ params }) {
  const slug = params.slug;
  const post = allPosts.find(
    (post) => post.slug.replace(/\.mdx$/, "") === slug
  );

  if (!post) return notFound();

  // 🔒 Premium gating logic
  if (post.premium) {
    // TODO: Replace with real session.user.id once Auth is wired in
    const userId = null;
    const hasAccess = await userHasActiveSubscription(userId);

    if (!hasAccess) {
      redirect("/subscribe");
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
            {new Date(post.date).toLocaleDateString("en-US", {
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
        <MDXRenderer code={post.body.code} />
      </div>

      {/* Comments */}
      <Card className="mt-12">
        <Heading level={3} className="mb-4">
          Comments
        </Heading>
        <CommentsSection />
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
  );
}
