import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { action } = await request.json();
    
    if (action !== 'start' && action !== 'stop') {
      return NextResponse.json({ error: 'Invalid action. Use "start" or "stop".' }, { status: 400 });
    }

    const url = action === 'start' 
      ? process.env.NEXT_PUBLIC_URL_START || process.env.URL_START
      : process.env.NEXT_PUBLIC_URL_STOP || process.env.URL_STOP;

    if (!url) {
      return NextResponse.json({ 
        error: `${action.toUpperCase()} URL not configured` 
      }, { status: 500 });
    }

    console.log(`Calling ${action} URL: ${url}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`${action} response:`, data);

    return NextResponse.json({
      success: true,
      action: action,
      message: data.message || `Successfully ${action}ed`,
      data: data
    }, { status: 200 });

  } catch (error) {
    console.error(`Error ${request.action || 'unknown'}:`, error);
    return NextResponse.json({
      success: false,
      error: error.message || 'An error occurred',
    }, { status: 500 });
  }
}