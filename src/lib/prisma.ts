import { PrismaClient } from '@prisma/client'
import { getDatabaseUrl } from '@/lib/databaseUrl'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: { url: getDatabaseUrl() },
    },
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
