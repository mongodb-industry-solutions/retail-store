import { MongoClient } from "mongodb";

const uri = process.env.IST_SHARED_MONGODB;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "dotLocalStore";
let db = null;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    //console.log("Connected successfully to MongoDB Atlas");
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
