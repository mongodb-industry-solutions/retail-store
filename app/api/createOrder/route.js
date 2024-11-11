import { connectToDatabase } from "@/app/_db/connect";
import { NextResponse } from "next/server";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    try {
        let order  = await request.json();
        console.log(order)
        const db = await connectToDatabase();
        const ordersCollection = db.collection('orders');

        const orderDocument = {
            _id: new ObjectId(),
            products : order.products,
            shipping_address: order.shipping_address,
            status_history: [
                {
                    status: "In process",
                    timestamp: Date.now()
                }
            ],
            type: order.type,
            user: new ObjectId(order.userId)
        };
      
        await ordersCollection.insertOne(orderDocument);
    
        return NextResponse.json({ order: orderDocument }, { status: 200 });
    }  catch (error) {
        console.error('Error creating order:', error);
        return new Response('Error creating order', { status: 500 });
      } finally {
        //await closeDatabase (); // Close the MongoDB client connection
      }
}