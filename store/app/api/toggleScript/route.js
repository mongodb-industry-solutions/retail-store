import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { action } = await request.json();

    if (action !== "start" && action !== "stop") {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "start" or "stop".' },
        { status: 400 }
      );
    }

    const url =
      action === "start"
        ? process.env.DYNAMIC_PRICING_START_URL
        : process.env.DYNAMIC_PRICING_STOP_URL;

    if (!url) {
      return NextResponse.json(
        { success: false, error: `${action.toUpperCase()} URL not configured` },
        { status: 500 }
      );
    }

    const audience = process.env.DYNAMIC_PRICING_AUDIENCE;
    if (!audience) {
      return NextResponse.json(
        { success: false, error: "DYNAMIC_PRICING_AUDIENCE not configured" },
        { status: 500 }
      );
    }

    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getIdTokenClient(audience);
    const resp = await client.request({ url, method: "GET" });

    return NextResponse.json(
      { success: true, action, data: resp.data },
      { status: 200 }
    );
  } catch (error) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data;

    if (data) {
      console.error("toggleScript upstream error:", data);
    } else {
      console.error("toggleScript error:", error);
    }

    const errorText =
      typeof data === "string"
        ? data
        : data?.error?.message ||
          data?.message ||
          error?.message ||
          "Unknown error";

    return NextResponse.json(
      { success: false, error: errorText },
      { status }
    );
  }
}
