import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.IST_SHARED_MONGODB;
let db = null;

const client = new MongoClient(uri);
const dbName = "dotLocalStore";

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export function closeDatabase() {
  if (client.isConnected()) {
    return client.close();
  }
  return Promise.resolve();
}
