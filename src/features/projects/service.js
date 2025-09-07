import prisma from "../../core/db/prisma"

// Get all projects
export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    })
}

// Get single project by ID
export async function getProject(id) {
    return await prisma.project.findUnique({
        where: { id: Number(id) },
    })
}

// Create a project
export async function createProject({ name, slug, description, link }) {
    return await prisma.project.create({
        data: { name, slug, description, link },
    })
}

// Update a project
export async function updateProject(id, { name, slug, description, link }) {
    return await prisma.project.update({
        where: { id: Number(id) },
        data: { name, slug, description, link },
    })
}

// Delete a project
export async function deleteProject(id) {
    return await prisma.project.delete({
        where: { id: Number(id) },
    })
}
