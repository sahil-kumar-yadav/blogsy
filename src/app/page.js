import SearchBar from "@/features/search/SearchBar"
import NewsletterForm from "@/features/newsletter/NewsletterForm"
import { getPosts } from "@/features/posts/service"
import { getProjects } from "@/features/projects/service"
import CommentsSection from "@/features/comments/CommentsSection"
import Heading from "@/shared/ui/Heading"
import Button from "@/shared/ui/Button"

export default async function Home() {
  const posts = await getPosts()
  const projects = await getProjects()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-16 text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="space-y-4 text-center">
        <Heading level={1}>Welcome to My Blog 🚀</Heading>
        <p className="text-lg text-gray-600">
          Sharing posts, projects, and ideas about web development, design, and beyond.
        </p>
      </section>

      {/* Search Feature */}
      <section>
        <Heading level={2} className="mb-4">
          Search
        </Heading>
        <SearchBar />
      </section>

      {/* Newsletter Signup */}
      <section className="space-y-4">
        <Heading level={2}>Subscribe to the Newsletter</Heading>
        <p className="text-gray-600">
          Stay up to date with the latest posts and projects.
        </p>
        <NewsletterForm />
      </section>

      {/* Recent Posts */}
      <section className="space-y-4">
        <Heading level={2}>Latest Posts</Heading>
        <ul className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <li key={post.id} className="p-4 border border-gray-200 rounded-md bg-white">
              <a href={`/blog/${post.slug}`} className="font-semibold text-blue-600 hover:underline">
                {post.title}
              </a>
              <p className="text-sm text-gray-600 mt-1">
                {post.content.slice(0, 100)}...
              </p>
              <div className="mt-2">
                <Button asChild size="sm" variant="outline">
                  <a href={`/blog/${post.slug}`}>Read More</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <Heading level={2}>Projects</Heading>
        <ul className="space-y-3">
          {projects.slice(0, 3).map((project) => (
            <li key={project.id} className="p-4 border border-gray-200 rounded-md bg-white">
              <a href={`/about/projects/${project.slug}`} className="font-semibold text-blue-600 hover:underline">
                {project.title}
              </a>
              <p className="text-sm text-gray-600 mt-1">
                {project.description.slice(0, 100)}...
              </p>
              <div className="mt-2">
                <Button asChild size="sm" variant="outline">
                  <a href={`/about/projects/${project.slug}`}>View Project</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Comments Teaser */}
      <section className="space-y-4">
        <Heading level={2}>Community Buzz</Heading>
        <CommentsSection postId={posts[0]?.id} />
      </section>
    </main>
  )
}
