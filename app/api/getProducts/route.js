import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection("products");
    const products = await collection.find({}, { projection: { name: 1, price: 1, brand: 1, image:1, id: 1, _id: 0 }}).toArray();
    return NextResponse.json({ products }, { status: 200 });
}