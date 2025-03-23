import { MongoClient } from "mongodb";

export const mongo_client = await new MongoClient(
  "mongodb://admin:password@localhost:27017"
).connect();
