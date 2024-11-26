import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    const orderId = await request.json(); 
    const db = await connectToDatabase();
    const collection = db.collection("orders");

    const order = await collection
        .find({_id: new ObjectId(String(orderId)) })
        .toArray()
    
    return NextResponse.json({ order: order[0] || null }, { status: 200 });
}