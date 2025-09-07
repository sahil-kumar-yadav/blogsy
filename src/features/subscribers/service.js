import prisma from "../../core/db/prisma"

// Get all subscribers
export async function getSubscribers() {
    return await prisma.subscriber.findMany({
        orderBy: { createdAt: "desc" },
    })
}

// Add new subscriber
export async function addSubscriber(email) {
    return await prisma.subscriber.create({
        data: { email },
    })
}

// Delete subscriber
export async function deleteSubscriber(id) {
    return await prisma.subscriber.delete({
        where: { id: Number(id) },
    })
}
