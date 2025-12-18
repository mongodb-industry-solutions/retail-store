import { NextResponse } from "next/server";
import fs from "node:fs";

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

    let token = process.env.GCP_ID_TOKEN;

    if (!token) {
      const saTokenPath = "/var/run/service-account/token";
      if (fs.existsSync(saTokenPath)) {
        token = fs.readFileSync(saTokenPath, "utf8").trim();
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing GCP identity token" },
        { status: 500 }
      );
    }

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!resp.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: resp.status }
      );
    }

    return NextResponse.json(
      { success: true, action, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.message || "An error occurred" },
      { status: 500 }
    );
  }
}
