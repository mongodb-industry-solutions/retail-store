import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function POST(request) {
    
    const filters = await request.json();
    
    const db = await connectToDatabase();
    const collection = db.collection("products");

    let queryBrand = {};
    let queryCategory = {};

    if (filters.selectedBrands && filters.selectedBrands.length > 0) {
        queryBrand = { brand: { $in: filters.selectedBrands } };

    }

    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
        queryCategory = { masterCategory: { $in: filters.selectedCategories } };

    }


    const products = await collection
        .find({"$and":[queryBrand, queryCategory]}, { projection: { name: 1, price: 1, brand: 1, image:1, id: 1, _id: 0, pred_price: 1, items: 1 }})
        .toArray();

       //console.log(products.items.name);
    return NextResponse.json({ products }, { status: 200 });
}