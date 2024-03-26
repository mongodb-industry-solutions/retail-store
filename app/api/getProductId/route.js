import { connectToDatabase } from "../../_db/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("products");

    const products = await collection.find({}, { projection: { _id: 1, id:1, pred_price:1 , name: 1 } }).toArray();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { products: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

