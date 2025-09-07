// src/core/db/prisma.js
import { PrismaClient } from '@/generated/prisma'

const globalForPrisma = globalThis

let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient()
    }
    prisma = globalForPrisma.prisma
}

export default prisma
