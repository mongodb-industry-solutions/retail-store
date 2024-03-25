import { connectToDatabase } from "../../_db/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection("products");

    const product = await collection.findOne(
      { id: req.productId },
      { projection: { pred_price: 1 } }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { pred_price: product.pred_price },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
