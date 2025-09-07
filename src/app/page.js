import SearchBar from "@/features/search/SearchBar";
import NewsletterForm from "@/features/newsletter/NewsletterForm";
import { getPosts } from "@/features/posts/service";
import { getProjects } from "@/features/projects/service";
import CommentsSection from "@/features/comments/CommentsSection";
import Heading from "@/shared/ui/Heading";
import Card from "@/shared/ui/Card";
import Link from "next/link";
import Button from "@/shared/ui/Button";

export default async function Home() {
  const posts = await getPosts();
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <Heading
          level={1}
          className="text-5xl sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Welcome to My Blog 🚀
        </Heading>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sharing posts, projects, and ideas about web development, design, and
          beyond.
        </p>
        <Button variant="primary" asChild>
          <Link href="/blog">Explore the Blog</Link>
        </Button>
      </section>

      {/* Search Feature */}
      <section>
        <Card className="p-6">
          <Heading level={2} className="mb-4">
            Search
          </Heading>
          <SearchBar />
        </Card>
      </section>

      {/* Newsletter Signup */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 shadow-lg">
        <div className="relative z-10 space-y-4 text-center">
          <Heading level={2} className="text-white">
            Subscribe to the Newsletter
          </Heading>
          <p className="text-blue-100">
            Stay up to date with the latest posts and projects.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <Heading level={2}>Latest Posts</Heading>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.slice(0, 3).map((post) => (
            <Card
              key={post.id}
              className="transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-2xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toDateString()}
              </p>
              <p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <Heading level={2}>Projects</Heading>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.slice(0, 3).map((project) => (
            <Card
              key={project.id}
              className="transition-transform hover:scale-[1.02] hover:shadow-md"
            >
              <Link
                href={`/about/projects/${project.slug}`}
                className="text-2xl font-semibold text-purple-600 hover:underline"
              >
                {project.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">{project.description.slice(0, 100)}...</p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href={`/about/projects/${project.slug}`}>View Project</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comments Teaser */}
      <section>
        <Card>
          <Heading level={2} className="mb-4">
            Community Buzz
          </Heading>
          <CommentsSection postId={posts[0]?.id} />
        </Card>
      </section>
    </main>
  );
}
