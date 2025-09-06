import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"
import Heading from "../../../shared/ui/Heading"

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export default function BlogPost({ params }) {
  const post = allPosts.find((p) => p.slug === params.slug)

  if (!post) return notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <article className="prose dark:prose-invert max-w-none">
      <Heading level={1}>{post.title}</Heading>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.date).toDateString()}
      </p>
      <MDXContent />
    </article>
  )
}
