import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

const POSTS_PATH = path.join(process.cwd(), "src/content/posts")

export function getPostSlugs() {
  return fs.readdirSync(POSTS_PATH).filter((p) => p.endsWith(".mdx"))
}

export function getPostBySlug(slug) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)
  return { content, data, slug }
}

export async function getSerializedPost(slug) {
  const { content, data } = getPostBySlug(slug)
  const mdxSource = await serialize(content, { scope: data })
  return { mdxSource, frontmatter: data }
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => {
      const { data } = getPostBySlug(slug.replace(/\.mdx$/, ""))
      return {
        slug: slug.replace(/\.mdx$/, ""),
        ...data,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // ✅ Sort by date (newest first)
}
