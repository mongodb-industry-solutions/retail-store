import { Storage } from "@google-cloud/storage";
import { clientPromise } from "@/app/_lib/mongodb";

// Shared function for bucket signing logic
export async function signBucketImages() {
  const storage = new Storage({ projectId: "ist-retail-demo" });
  const bucketName = process.env.GCP_STORAGE_BUCKET;
  const folderName = process.env.GCP_BUCKET_FOLDER;

  const bucket = storage.bucket(bucketName);
  const [files] = await bucket.getFiles({ prefix: folderName });

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("products");

  const updates = await Promise.all(
    files.map(async (file) => {
      if (file.name.endsWith("/")) return null;

      const [signedUrl] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 48 * 60 * 60 * 1000, // 48 hourss
      });

      const id = parseInt(file.name.split("/").pop().split(".")[0], 10);

      const updateResult = await collection.updateOne(
        { id },
        { $set: { "image.url": signedUrl } }
      );

      return { file: file.name, acknowledged: updateResult.acknowledged };
    })
  );

  return {
    GeneratedURLsAndUpdatedCollection: true,
    results: updates.filter(Boolean),
  };
}

export async function POST(req) {
  try {
    const result = await signBucketImages();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
