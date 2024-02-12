import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

/**
 * TODO(developer):
 *  1. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  2. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */

export async function GET(req) {
  // The client library finds your credentials using ADC.
  try {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const [buckets] = await storage.getBuckets();
    const bucketNames = buckets.map((bucket) => bucket.name);

    return NextResponse.json(
      {
        buckets: bucketNames,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
