import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function POST(request) {
    
    const filters = await request.json();
    
    const db = await connectToDatabase();
    const collection = db.collection("products");

    let query = {};

    if (filters.selectedBrands && filters.selectedBrands.length > 0) {
        query = { brand: { $in: filters.selectedBrands } };
    }

    const products = await collection
        .find(query, { projection: { name: 1, price: 1, brand: 1, image:1, id: 1, _id: 0, pred_price: 1 }})
        .toArray();
    return NextResponse.json({ products }, { status: 200 });
}