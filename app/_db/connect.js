import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; 

const client = new MongoClient(uri);

const dbName = "shop";

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    return client.db(dbName);
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
