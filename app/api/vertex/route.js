const { GoogleAuth } = require("google-auth-library");
const {NextResponse} = require("next/server");
const axios = require("axios");

/*const data = {
  instances: [[0.5, 0.5, 1, 0.1]],
};*/

async function getAccessToken() {
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    //console.log(accessToken.res.data.access_token);
    return accessToken.res.data.access_token;
  }

export async function POST(req, res) {
  try {
    const accessToken = await getAccessToken();
    let url = process.env.VERTEX_AI_ENDPOINT;
    const data = await req.json();


    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
