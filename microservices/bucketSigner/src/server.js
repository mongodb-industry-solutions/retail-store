import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
import { connectToDatabase, closeDatabase } from "./connect.js";
import fs from "fs/promises";

dotenv.config();
const port = process.env.PORT;
const jsonFilePath = "/config/serviceAccountKey.json";

const app = new Koa();
const router = new Router();

app.use(logger());

async function loadJson(filePath) {
  try {
    const data = await fs.readFile(process.cwd() + filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load and parse JSON file:", error);
    throw error;
  }
}

router.get("/signURLs", async (ctx) => {
  let db;
  try {
    const serviceAccountKey = await loadJson(jsonFilePath);
    const storage = new Storage({
      credentials: serviceAccountKey,
    });

    const bucketName = process.env.GCP_STORAGE_BUCKET;
    const folderName = process.env.GCP_BUCKET_FOLDER;

    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix: folderName });

    db = await connectToDatabase();
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

        return { file: file.name, acknowledged: updateResult.acknowledged };
      })
    );

    const results = updates.filter((result) => result !== null);

    ctx.body = { GeneratedURLsAndUpdatedCollection: true, results };
    ctx.status = 200;
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.body = { error: "Failed to process request" };
    ctx.status = 500;
  } finally {
    if (db) {
      await closeDatabase();
    }
  }
});

app.use(router.routes());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
