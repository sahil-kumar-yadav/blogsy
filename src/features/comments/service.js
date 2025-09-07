import prisma from "../../core/db/prisma"

// Get all comments for a post
export async function getComments(postId) {
    return await prisma.comment.findMany({
        where: { postId: Number(postId) },
        orderBy: { createdAt: "desc" },
    })
}

// Get single comment
export async function getComment(id) {
    return await prisma.comment.findUnique({
        where: { id: Number(id) },
    })
}

// Create comment
export async function createComment({ postId, author, content }) {
    return await prisma.comment.create({
        data: { postId, author, content },
    })
}

// Update comment
export async function updateComment(id, { content }) {
    return await prisma.comment.update({
        where: { id: Number(id) },
        data: { content },
    })
}

// Delete comment
export async function deleteComment(id) {
    return await prisma.comment.delete({
        where: { id: Number(id) },
    })
}
