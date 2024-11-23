
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI;
let db = null;

const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;

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
  if (client.topology.isConnected()) {
    console.log("Connection closed successfully to MongoDB Atlas");
    return client.close();
  }
  return Promise.resolve();
}
