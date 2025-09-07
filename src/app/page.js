import CommentsTeaser from "@/components/home/CommentsTeaser"
import HeroSection from "@/components/home/HeroSection"
import NewsletterSection from "@/components/home/NewsletterSection"
import PostsSection from "@/components/home/PostsSection"
import ProjectsSection from "@/components/home/ProjectsSection"
import SearchSection from "@/components/home/SearchSection"
import { getPosts } from "@/features/posts/service"
import { getProjects } from "@/features/projects/service"


export default async function Home() {
  const posts = await getPosts()
  const projects = await getProjects()

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <HeroSection />
      <SearchSection />
      <NewsletterSection />
      <PostsSection posts={posts} />
      <ProjectsSection projects={projects} />
      <CommentsTeaser postId={posts[0]?.id} />
    </main>
  )
}
