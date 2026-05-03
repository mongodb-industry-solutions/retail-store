import cron from "node-cron";

// Store the cron job instance
let cronJob = null;
let isRunning = false;

// Function to call the bucketSigner API
async function callBucketSigner() {
  try {
    console.log(`[${new Date().toISOString()}] Starting scheduled bucket signing...`);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
    const response = await fetch(`${baseUrl}/api/bucketSigner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`[${new Date().toISOString()}] Bucket signing completed successfully:`, result);
    } else {
      console.error(`[${new Date().toISOString()}] Bucket signing failed with status:`, response.status);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error calling bucket signer:`, error);
  }
}

// Start the cron job
export function startBucketSignerScheduler() {
  if (cronJob) {
    console.log('Bucket signer cron job is already running');
    return { success: false, message: 'Already running' };
  }
  
  // Schedule to run every day at midnight (0 0 * * *)
  cronJob = cron.schedule('0 0 * * *', callBucketSigner, {
    scheduled: true
  });
  
  isRunning = true;
  console.log(`[${new Date().toISOString()}] Bucket signer cron job started - runs daily at midnight`);
  return { success: true, message: 'Cron job started' };
}

// Stop the cron job
export function stopBucketSignerScheduler() {
  if (cronJob) {
    cronJob.destroy();
    cronJob = null;
    isRunning = false;
    console.log(`[${new Date().toISOString()}] Bucket signer cron job stopped`);
    return { success: true, message: 'Cron job stopped' };
  }
  return { success: false, message: 'No cron job running' };
}

// Get status
export function getSchedulerStatus() {
  return {
    isRunning,
    nextRun: cronJob ? 'Daily at midnight' : 'Not scheduled',
    message: 'Bucket signer scheduler status'
  };
}

// Manually trigger
export async function triggerBucketSigner() {
  await callBucketSigner();
  return { success: true, message: 'Bucket signer triggered manually' };
}