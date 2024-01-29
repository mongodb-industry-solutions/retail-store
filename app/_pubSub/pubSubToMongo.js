import { PubSub } from '@google-cloud/pubsub';
import { MongoClient } from 'mongodb';

const pubsub = new PubSub();
const uri = process.env.DOTLOCAL_SHOP_MONGO_URI;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function storeMessageInMongoDB(message) {
  const db = client.db('shop');
  const collection = db.collection('items');

  try {
    const result = await collection.insertOne(message);
    console.log('Document inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting document into MongoDB:', error);
  }
}

async function subscribeToPubSub() {
  const subscriptionName = 'my-sub';

  const subscription = pubsub.subscription(subscriptionName);

  subscription.on('message', async (message) => {
    const messageData = JSON.parse(Buffer.from(message.data, 'base64').toString('utf-8'));
    await storeMessageInMongoDB(messageData);
    message.ack();
  });

  console.log(`Subscribed to Pub/Sub subscription: ${subscriptionName}`);
}

export { connectToMongoDB, subscribeToPubSub };
