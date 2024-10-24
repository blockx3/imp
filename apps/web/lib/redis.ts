import { createClient, RedisClientType } from "redis";

export const Redis_client = createClient({
  url: process.env.REDIS_URL,
}) as RedisClientType;
Redis_client.on("error", (err) => console.log("Redis Client Error", err));
await Redis_client.connect();
