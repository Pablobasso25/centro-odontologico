// Cliente de Prisma — el único punto de conexión con la base de datos.


import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaGlobal = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  prismaGlobal.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  })

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma
}
