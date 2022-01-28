import { PrismaClient } from '@prisma/client'

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}
if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
        db = new PrismaClient({
            log: ['error']
        });
        db.$connect();
    } else {
        if (!global.__db) {
            global.__db = new PrismaClient({
                log: ['query', 'error', 'warn']
            });
            global.__db.$connect();
        }
        db = global.__db;
    }
}

export { db };
