import { PrismaClient } from "@prisma/pg_client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  PG_prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const PG_PRISMA_CLIENT =
  globalThis.PG_prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  globalThis.PG_prismaGlobal = PG_PRISMA_CLIENT;
