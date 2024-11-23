
import { NextResponse } from 'next/server';
import { getPredPriceChangeStream } from '../../_lib/mongodb';

const HEARTBEAT_INTERVAL = 5000 // Keep alive interval in milliseconds

export async function GET(req) {
  // Check if the client accepts SSE
  if (req.headers.get('accept') === 'text/event-stream') {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    
    // Set SSE headers
    const headers = new Headers({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const intervalId = setInterval(() => {
      // Send a heartbeat message to keep the connection alive
      if (writable.locked) {
        writer.write(encoder.encode(': heartbeat\n\n')).catch((error) => {
          console.error('Error writing heartbeat:', error);
        });
      } else {
        console.warn('Writable stream is not locked, skipping heartbeat.');
      }
    }, HEARTBEAT_INTERVAL);

    // Send real-time updates to the client
    const sendUpdate = (data) => {
      if (writable.locked) {
        const event = `data: ${JSON.stringify(data)}\n\n`;
        writer.write(encoder.encode(event)).catch((error) => {
          console.error('Error writing update:', error);
        });
      } else {
        console.warn('Writable stream is not locked, skipping update.');
      }
    }

    const changeStream = await getPredPriceChangeStream();

    const changeListener = (change) => {
      // Notify the client about the change
      sendUpdate(change);
    };

    changeStream.on('change', changeListener);

    // Handle client disconnect
    req.signal.addEventListener('abort', () => {
      // Clean up resources and stop sending updates when the client disconnects
      console.log("Client disconnected");
      clearInterval(intervalId);
      changeStream.off('change', changeListener);
      writer.close().catch((error) => {
        console.error('Error closing writer:', error);
      });
    });

    return new NextResponse(readable, { headers });
    
  } else {
    // Return a 404 response for non-SSE requests
    console.log('404');
    return new NextResponse('Not Found', { status: 404 });
  }
}
