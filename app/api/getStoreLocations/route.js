import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function POST() {    
    const db = await connectToDatabase();
    const collection = db.collection("locations");

    const storeLocations = await collection
        .find({})
        .toArray();

    return NextResponse.json({ storeLocations }, { status: 200 });
}