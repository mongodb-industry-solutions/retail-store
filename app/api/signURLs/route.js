import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import serviceAccountKey from "../../../ist-retail-demo-c2e70dfceaa3.json";
import { connectToDatabase } from "../../_db/connect";

export async function GET(req) {
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
          expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
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

    return NextResponse.json({ GeneratedURLsAndUpdatedCollection: true  }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
