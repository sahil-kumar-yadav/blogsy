import Heading from "@/shared/ui/Heading"
import Card from "@/shared/ui/Card"
import Button from "@/shared/ui/Button"
import Link from "next/link"

export default function ProjectsSection({ projects }) {
    return (
        <section className="space-y-6">
            <Heading level={2}>Projects</Heading>
            <div className="grid gap-6 sm:grid-cols-2">
                {projects.slice(0, 3).map((project) => (
                    <Card key={project.id} className="transition-transform hover:scale-[1.02] hover:shadow-md">
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
    )
}
