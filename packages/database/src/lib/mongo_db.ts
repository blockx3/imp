import { PrismaClient } from "@prisma/mongo_client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  mongo_prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const MONGO_PRISMA_CLIENT =
  globalThis.mongo_prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  globalThis.mongo_prismaGlobal = MONGO_PRISMA_CLIENT;
