import { allPosts } from "contentlayer/generated"

export async function GET() {
  const posts = allPosts
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      description: p.description,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  })
}
