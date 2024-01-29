import { PubSub } from "@google-cloud/pubsub";
import { connectToDatabase } from "../_db/connect";

const projectId = "ist-retail-demo"; // Your Google Cloud Platform project ID
const topicName = "my-topic"; // Name of the topic to listen to
const subscriptionName = "my-sub"; // Name of the subscription to create

const pubsub = new PubSub({ projectId });
const client = connectToDatabase();

async function storeMessageInMongoDB(message) {
  const db = client.db("shop");
  const collection = db.collection("items");

  try {
    const result = await collection.insertOne(message);
    console.log("Document inserted:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document into MongoDB:", error);
  }
}

async function listenToPubSub() {
  const subscription = pubsub.subscription(subscriptionName);

  subscription.on("message", async (message) => {
    const messageData = JSON.parse(
      Buffer.from(message.data, "base64").toString("utf-8")
    );
    await storeMessageInMongoDB(messageData);
    message.ack();
  });

  console.log(`Listening to Pub/Sub topic: ${topicName}`);
}

export { listenToPubSub };
