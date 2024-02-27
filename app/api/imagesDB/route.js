import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/_db/connect";
import * as Realm from "realm-web";
import { useApp } from "@/app/_db/realm";

export async function GET(req) {
  try {
    const app = useApp();
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("shop").collection("test");
    const result = await collection.find({}, { projection: { image: 1, _id: 0 } });

    const imageUrl = result[0]?.image?.url;

    return NextResponse.json(
      {
        data: imageUrl || null, 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
