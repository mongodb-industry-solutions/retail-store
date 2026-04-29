import { NextResponse } from "next/server";
import { startBucketSignerScheduler, getSchedulerStatus } from "@/app/lib/cronScheduler";

let initialized = false;

export async function GET() {
  if (!initialized) {
    console.log('Initializing bucket signer scheduler...');
    startBucketSignerScheduler();
    initialized = true;
  }
  
  const status = getSchedulerStatus();
  return NextResponse.json({
    message: 'App initialized',
    scheduler: status,
    timestamp: new Date().toISOString()
  });
}