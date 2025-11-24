import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
import { GoogleAuth } from "google-auth-library";
import { connectToDatabase, closeDatabase } from "./connect.js";

dotenv.config();
const port = process.env.PORT;
const app = new Koa();
const router = new Router();

app.use(logger());

router.get("/signURLs", async (ctx) => {
  let db;
    try {

    // this is not needed if GOOGLE_APPLICATION_CREDENTIALS is set. you can set it by doing the following: 'gcloud auth application-default login'
    // const auth = new GoogleAuth({
    //   scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    //   projectId: "ist-retail-demo",
    // });

    //const client = await auth.getClient();
    const storage = new Storage({ projectId: "ist-retail-demo" });
    // Log the credentials being used (if available)
    //const authClient = storage.authClient;

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