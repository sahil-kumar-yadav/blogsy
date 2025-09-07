import { PrismaClient } from "@prisma/client"

let prisma

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    // Avoid creating new client on hot reload in dev
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma
