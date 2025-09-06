let projects = [
  {
    id: 1,
    name: "My Portfolio",
    slug: "my-portfolio",
    description: "A personal portfolio website",
    link: "https://example.com",
  },
]

export function getProjects() {
  return projects
}

export function getProject(id) {
  return projects.find((p) => p.id === Number(id))
}

export function createProject(project) {
  const newProject = { id: Date.now(), ...project }
  projects.push(newProject)
  return newProject
}

export function updateProject(id, updated) {
  projects = projects.map((p) =>
    p.id === Number(id) ? { ...p, ...updated } : p
  )
  return getProject(id)
}

export function deleteProject(id) {
  projects = projects.filter((p) => p.id !== Number(id))
}
