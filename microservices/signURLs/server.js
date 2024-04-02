import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
import serviceAccountKey from "./ist-retail-demo-c2e70dfceaa3.json" assert { type: "json" };
import { connectToDatabase } from "./connect.js";

dotenv.config();
const port = process.env.PORT;

const app = new Koa();
const router = new Router();

app.use(logger());

router.get("/signURLs", async (ctx) => {
  try {
    const storage = new Storage({
      credentials: serviceAccountKey,
    });

    const bucketName = process.env.GCP_STORAGE_BUCKET;
    const folderName = "storeProducts/";

    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix: folderName });

    const db = await connectToDatabase();
    const collection = db.collection("products");

    const updates = await Promise.all(
      files.map(async (file) => {
        if (file.name.endsWith("/")) {
          return null;
        }

        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 14 * 60 * 60 * 1000, // 14 hours
        });

        const id = parseInt(file.name.split("/").pop().split(".")[0], 10);

        const updateResult = await collection.updateOne(
          { id: id },
          { $set: { "image.url": signedUrl } }
        );

        return updateResult;
      })
    );

    const results = updates
      .filter((result) => result !== null)
      .map((result) => result.matchedCount);

    ctx.body = { GeneratedURLsAndUpdatedCollection: true };
    ctx.status = 200;
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.body = { error: "Failed to process request" };
    ctx.status = 500;
  }
});

app.use(router.routes());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
