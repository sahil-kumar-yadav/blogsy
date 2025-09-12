"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getProjects, updateProject } from "@/features/projects/service"

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id
  const [project, setProject] = useState(null)

  useEffect(() => {
    async function loadProject() {
      const data = await getProjects(projectId)
      setProject(data)
    }
    loadProject()
  }, [projectId])

  if (!project) return <p>Loading...</p>

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProject(projectId, project)
    router.push("/admin/projects")
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <input
          type="text"
          value={project.slug}
          onChange={(e) => setProject({ ...project, slug: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <textarea
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <input
          type="url"
          value={project.link}
          onChange={(e) => setProject({ ...project, link: e.target.value })}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Update
        </button>
      </form>
    </section>
  )
}
