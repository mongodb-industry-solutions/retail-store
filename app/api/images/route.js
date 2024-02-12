import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const storage = new Storage({
      credentials: require("service-account-key-file.json"),
    });

    const bucketName = process.env.GCP_STORAGE_BUCKET;
    const fileName = "images/10000.jpg";
    const file = storage.bucket(bucketName).file(fileName);

    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000,
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
