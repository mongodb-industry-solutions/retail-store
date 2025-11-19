import { MongoClient } from "mongodb";

let client = null;
let db = null;
const dbName = "dotLocalStore";

export async function connectToDatabase() {
  // Return early if we already have a connection
  if (db) {
    return db;
  }

  // Check if MongoDB URI is available (avoid build-time errors)
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  try {
    // Create client only when actually connecting
    if (!client) {
      client = new MongoClient(uri);
    }
    
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
