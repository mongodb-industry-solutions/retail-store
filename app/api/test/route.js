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
    const collection = mongo.db("shop").collection("items");
    const result = await collection.findOne();

    return NextResponse.json(
      {
        message: "Item Found",
        data: result || null, 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
