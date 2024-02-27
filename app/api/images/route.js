import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import serviceAccountKey from "../../../ist-retail-demo-c2e70dfceaa3.json";


export async function GET(req) {
  try {
    const storage = new Storage({
      credentials: serviceAccountKey,
    });

    const bucketName = process.env.GCP_STORAGE_BUCKET;
    const fileName = "storeProducts/book.JPG";
    const file = storage.bucket(bucketName).file(fileName);

    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    return NextResponse.json(
      {
        ImageURL: signedUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch signed URL" },
      { status: 500 }
    );
  }
}
