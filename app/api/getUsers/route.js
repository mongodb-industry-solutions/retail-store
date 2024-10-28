import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function POST() {    
    const db = await connectToDatabase();
    const collection = db.collection("users");

    const users = await collection
        .find({})
        .toArray();

    return NextResponse.json({ users }, { status: 200 });
}