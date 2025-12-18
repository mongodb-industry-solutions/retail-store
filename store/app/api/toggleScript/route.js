import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export async function POST(request) {
  try {
    const { action } = await request.json();

    if (action !== "start" && action !== "stop") {
      return NextResponse.json(
        { error: 'Invalid action. Use "start" or "stop".' },
        { status: 400 }
      );
    }

    const url =
      action === "start"
        ? process.env.DYNAMIC_PRICING_START_URL
        : process.env.DYNAMIC_PRICING_STOP_URL;

    if (!url) {
      return NextResponse.json(
        { error: `${action.toUpperCase()} URL not configured` },
        { status: 500 }
      );
    }

    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(url);
    const response = await client.request({ url, method: "GET" });

    return NextResponse.json(
      {
        success: true,
        action,
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
