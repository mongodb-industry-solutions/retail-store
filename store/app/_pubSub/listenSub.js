import { PubSub } from "@google-cloud/pubsub";
import { connectToDatabase } from "@/store/app/_db/connect";

const db = await connectToDatabase();

async function listenToSub(
  projectId = "ist-retail-demo",
  topicNameOrId = "my-topic",
  subscriptionName = "my-sub"
) {
  // Create a client
  const pubsub = new PubSub({ projectId });

  // Get an existing topic
  const topic = pubsub.topic(topicNameOrId);

  // Get an existing subscription
  const subscription = topic.subscription(subscriptionName);

  // Listen for messages and save them on the DB
  subscription.on("message", async (message) => {
    console.log("Received message:", message.data.toString());
    try {
      const jsonData = JSON.parse(message.data.toString());
      const collection = db.collection("items");
      const result = await collection.insertOne(jsonData);
      console.log("Document inserted:", result.insertedId);
    } catch (error) {
      console.error("Error parsing or inserting JSON data:", error);
    }
  });

  // Errors
  subscription.on("error", (error) => {
    console.error("Received error:", error);
    process.exit(1);
  });
}

// Call the function to start listening to Pub/Sub messages
listenToSub();

const PubSubs = () => {
  return <h1>Hola</h1>;
};

export default PubSubs;
