import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import fs from "node:fs";

export const runtime = "nodejs";

function extractGsaEmailFromWifConfig(path) {
  const cfg = JSON.parse(fs.readFileSync(path, "utf8"));
  const url = cfg?.service_account_impersonation_url;
  if (!url) return null;

  const m = url.match(/serviceAccounts\/([^:]+):generateAccessToken/);
  return m ? decodeURIComponent(m[1]) : null;
}

async function readBody(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { text, data };
}

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
        { success: false, error: "Dynamic pricing URL not configured" },
        { status: 500 }
      );
    }

    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credsPath || !fs.existsSync(credsPath)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GOOGLE_APPLICATION_CREDENTIALS not configured. This endpoint must run in Kanopy with Workload Identity.",
        },
        { status: 500 }
      );
    }

    const gsa = extractGsaEmailFromWifConfig(credsPath);
    if (!gsa) {
      return NextResponse.json(
        { success: false, error: "Unable to determine GCP service account" },
        { status: 500 }
      );
    }

    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const adc = await auth.getClient();
    const { token: accessToken } = await adc.getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Failed to obtain GCP access token" },
        { status: 500 }
      );
    }

    const audience = new URL(url).origin;
    const genUrl = `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(
      gsa
    )}:generateIdToken`;

    const genRes = await fetch(genUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audience, includeEmail: true }),
    });

    const genBody = await readBody(genRes);

    if (!genRes.ok || !genBody?.data?.token) {
      console.error("toggleScript generateIdToken error:", genBody.data ?? genBody.text);
      return NextResponse.json(
        { success: false, error: genBody.data ?? genBody.text },
        { status: genRes.status }
      );
    }

    const idToken = genBody.data.token;

    const callRes = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${idToken}` },
    });

    const callBody = await readBody(callRes);

    if (!callRes.ok) {
      console.error("toggleScript upstream error:", callBody.data ?? callBody.text);
      return NextResponse.json(
        { success: false, error: callBody.data ?? callBody.text },
        { status: callRes.status }
      );
    }

    return NextResponse.json(
      { success: true, action, data: callBody.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("toggleScript error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "An error occurred" },
      { status: 500 }
    );
  }
}
