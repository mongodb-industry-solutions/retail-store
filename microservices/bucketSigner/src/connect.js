import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);
let db = null;

export async function connectToDatabase() {
  if (db && client.topology && client.topology.isConnected()) {
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

export async function closeDatabase() {
  if (client && client.topology && client.topology.isConnected()) {
    console.log("Closing MongoDB connection");
    try {
      await client.close();
      console.log("MongoDB connection closed successfully");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  } else {
    console.log("MongoDB connection already closed or not initialized");
  }
}
