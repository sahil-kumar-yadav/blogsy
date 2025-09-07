import prisma from "../../core/db/prisma"

// Get all posts
export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    })
}

// Get single post by ID
export async function getPost(id) {
    return await prisma.post.findUnique({
        where: { id: Number(id) },
    })
}

// Get single post by slug
export async function getPostBySlug(slug) {
    return await prisma.post.findUnique({
        where: { slug },
    })
}

// Create a new post
export async function createPost({ title, slug, content }) {
    return await prisma.post.create({
        data: { title, slug, content },
    })
}

// Update existing post
export async function updatePost(id, { title, slug, content }) {
    return await prisma.post.update({
        where: { id: Number(id) },
        data: { title, slug, content },
    })
}

// Delete a post
export async function deletePost(id) {
    return await prisma.post.delete({
        where: { id: Number(id) },
    })
}
