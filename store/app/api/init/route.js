import { NextResponse } from "next/server";
import { startBucketSignerScheduler, getSchedulerStatus, triggerBucketSigner } from "@/app/lib/cronScheduler";

let initialized = false;

export async function GET() {
  if (!initialized) {
    console.log('Initializing bucket signer scheduler...');
    startBucketSignerScheduler();
    
    // Also trigger bucket signing immediately to ensure images are signed
    console.log('Triggering immediate bucket signing on initialization...');
    await triggerBucketSigner();
    
    initialized = true;
  }
  
  const status = getSchedulerStatus();
  return NextResponse.json({
    message: 'App initialized',
    scheduler: status,
    timestamp: new Date().toISOString()
  });
}