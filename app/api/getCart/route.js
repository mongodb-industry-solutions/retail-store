import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    const userId = await request.json(); 
    const db = await connectToDatabase();
    const collection = db.collection("carts");

    const cart = await collection
        .find({user: new ObjectId(String(userId)) })
        .toArray()
    
    return NextResponse.json({ cart: cart[0] || null }, { status: 200 });
}