import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
      });

      const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

      const [files] = await bucket.getFiles();
      const fileNames = files.map((file) => file.name);


      return NextResponse.json(
        {
          Files: fileNames,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }