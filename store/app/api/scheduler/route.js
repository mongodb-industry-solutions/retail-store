import { NextResponse } from "next/server";
import { 
  startBucketSignerScheduler, 
  stopBucketSignerScheduler, 
  getSchedulerStatus, 
  triggerBucketSigner 
} from "@/app/lib/cronScheduler";

// API endpoints to manage the cron job
export async function GET(request) {
  const status = getSchedulerStatus();
  return NextResponse.json(status);
}

export async function POST(request) {
  const { action } = await request.json();
  
  let result;
  switch (action) {
    case 'start':
      result = startBucketSignerScheduler();
      break;
      
    case 'stop':
      result = stopBucketSignerScheduler();
      break;
      
    case 'trigger':
      result = await triggerBucketSigner();
      break;
      
    default:
      return NextResponse.json({ error: 'Invalid action. Use: start, stop, or trigger' }, { status: 400 });
  }
  
  return NextResponse.json(result);
}