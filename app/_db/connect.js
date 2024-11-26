import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const dbName = process.env.DATABASE_NAME;
let db = null;

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
