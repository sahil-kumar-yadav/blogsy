import { allPosts } from "contentlayer/generated"
import { notFound } from "next/navigation"
import CommentsSection from "../../../features/comments/CommentsSection"

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

// ✅ Helper function to find post
async function getPost(slug) {
  return allPosts.find((post) => post.slug === slug)
}

export default async function BlogPostPage({ params }) {
  // Await params to get the real object
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />

      <div className="mt-12">
        <CommentsSection />
      </div>
    </article>
  );
}
