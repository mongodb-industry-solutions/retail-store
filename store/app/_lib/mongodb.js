import { MongoClient } from "mongodb";

// MongoDB client setup - validate environment at runtime, not import time
let client;
let mongoClientPromise;
let predPriceDataChangeStream;

function validateEnvironment() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  if (!process.env.DATABASE_NAME) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_NAME"');
  }
}

function getMongoClient() {
  validateEnvironment(); // Only validate when actually used
  
  const uri = process.env.MONGODB_URI;

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    mongoClientPromise = client.connect();
    global._mongoClientPromise = mongoClientPromise;
  } else {
    mongoClientPromise = global._mongoClientPromise;
  }
  
  return mongoClientPromise;
}

async function getPredPriceChangeStream() {
  if (!predPriceDataChangeStream) {
    validateEnvironment(); // Validate environment when actually used
    
    const dbName = process.env.DATABASE_NAME;
    const collectionName = process.env.COLLECTION_NAME;

    const clientPromise = getMongoClient(); // Use the function instead of global variable
    const client = await clientPromise;
    const database = client?.db(dbName);
    const productsCollection = database.collection(collectionName);

    const pipeline = [];
    predPriceDataChangeStream = productsCollection.watch(pipeline);

    predPriceDataChangeStream.on('change', (change) => {
      //console.log('Change: ', change);
    });

    predPriceDataChangeStream.on('error', (error) => {
      console.log('Error: ', error);
    });
  }
  return predPriceDataChangeStream;
}

// Export a function that returns clientPromise instead of the variable itself
export const clientPromise = getMongoClient;
export { getPredPriceChangeStream };
