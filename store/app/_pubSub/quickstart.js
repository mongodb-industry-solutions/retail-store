import { PubSub } from "@google-cloud/pubsub";
import { connectToDatabase } from "../_db/connect";

const db = await connectToDatabase();

async function quickstart(
  projectId = "ist-retail-demo", // Google Cloud Platform project ID from the GCP website
  topicNameOrId = "my-topic", // Name for the new topic to be created
  subscriptionName = "my-sub" // Name for the new subscription to be created
) {
  // Create a client
  const pubsub = new PubSub({ projectId });

  // Create a new topic
  const [topic] = await pubsub.createTopic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  // Create a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);

  // Listen for messages and save them on the DB
  subscription.on("message", async (message) => {
    console.log("Received message:", message.data.toString());
    try {
      const jsonData = JSON.parse(message.data.toString()); // Assuming the data is in JSON 
      const collection = db.collection("items");
      const result = await collection.insertOne(jsonData);
      console.log("Document inserted:", result.insertedId);
    } catch (error) {
      console.error("Error parsing or inserting JSON data:", error);
    }
    message.ack();
  });

  // Errors
  subscription.on("error", (error) => {
    console.error("Received error:", error);
    process.exit(1);
  });

  // Send a message to the topic
  //topic.publishMessage({ data: Buffer.from("Test message!") });
}

quickstart();

export { quickstart };
