import Link from "next/link";
import Heading from "../../shared/ui/Heading";
import Card from "../../shared/ui/Card";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="site-main space-y-10">
      {/* Page Title */}
      <Heading level={1} align="center" animated>
        Blog
      </Heading>

      {/* Post Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug}>
            <Card
              variant="hover"
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Thumbnail */}
              <Link href={`/blog/${post.slug}`}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={post.image || "https://source.unsplash.com/800x400/?blog,writing"}
                    alt={post.title}
                    className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1 mt-4 space-y-2">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-[var(--color-muted)]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-[var(--color-fg)] line-clamp-3">
                  {post.description}
                </p>
              </div>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
