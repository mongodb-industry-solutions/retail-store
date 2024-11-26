import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    const userId = await request.json(); 
    const db = await connectToDatabase();
    const collection = db.collection("orders");

    const orders = await collection
        .find({user: new ObjectId(String(userId)) })
        .sort({ _id: -1 }) // Sort by _id in descending order for newest first
        .toArray()
    
    return NextResponse.json({ orders: orders || [] }, { status: 200 });
}