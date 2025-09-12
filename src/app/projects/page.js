"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProjects } from "@/features/projects/service"
import ButtonComponent from "@/components/shared/Button"

export default function PublicProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No projects have been added yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded-md dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{project.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
                <div>
                  <ButtonComponent
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    View
                  </ButtonComponent>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
