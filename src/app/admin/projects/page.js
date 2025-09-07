"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AdminProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      const res = await fetch("/api/projects")
      setProjects(await res.json())
    }
    loadProjects()
  }, [])

  const handleDelete = async (id) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-3 py-2 bg-green-600 text-white rounded-md"
        >
          ➕ New Project
        </Link>
      </div>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="p-4 border rounded-md dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
              <div className="space-x-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  View
                </a>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
