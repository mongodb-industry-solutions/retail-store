import { MongoClient, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
if (!process.env.DATABASE_NAME) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_NAME"');
}

// MongoDB client setup
const uri = process.env.MONGODB_URI;
///const options = { appName: "automotive-acoustic-diagnostics" };

let client;
let clientPromise;
let predPriceDataChangeStream;
let orderStatusChangeStream;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)//, options);
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;
} else {
  clientPromise = global._mongoClientPromise;
}

async function getOrderStatusChangeStream(userId) {
    console.log('userId getOrderStatusChangeStream:', userId)
  if (!predPriceDataChangeStream) {
    const dbName = process.env.DATABASE_NAME;
    const collectionName = process.env.COLLECTION_NAME

    const client = await clientPromise;
    const database = client.db(dbName);
    const productsCollection = database.collection(collectionName);

    const options = { fullDocument: 'updateLookup' };
    const pipeline = [{ $match: { 'fullDocument.user':  ObjectId.createFromHexString(userId) } } ];
    predPriceDataChangeStream = productsCollection.watch(pipeline, options);

    predPriceDataChangeStream.on('change', (change) => {
      console.log('Change: ', change);
    });

    predPriceDataChangeStream.on('error', (error) => {
      console.log('Error: ', error);
    });
  }
  return predPriceDataChangeStream;
}

async function getOrderDetailsChangeStream(orderId) {
    console.log('userId getOrderStatusChangeStream:', orderId)
  if (!orderStatusChangeStream) {
    const dbName = process.env.DATABASE_NAME;
    const collectionName = process.env.COLLECTION_NAME

    const client = await clientPromise;
    const database = client.db(dbName);
    const productsCollection = database.collection(collectionName);

    const options = { fullDocument: 'updateLookup' };
    const pipeline = [ {$match: { 'documentKey._id': ObjectId.createFromHexString(orderId) } } ]
    orderStatusChangeStream = productsCollection.watch(pipeline, options);

    orderStatusChangeStream.on('change', (change) => {
      console.log('Change: ', change);
    });

    orderStatusChangeStream.on('error', (error) => {
      console.log('Error: ', error);
    });
  }
  return orderStatusChangeStream;
}

export { clientPromise, getOrderStatusChangeStream, getOrderDetailsChangeStream };
