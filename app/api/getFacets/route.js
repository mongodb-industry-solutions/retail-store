import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection("products");
    const pipeline = [
            {
                $searchMeta: {
                    index: "facets",
                    facet: {
                        facets: {
                            brand: {
                                type: "string",
                                path: "brand",
                                numBuckets: 200 // Set this to a higher number to get more unique values
                            },
                            masterCategory: {
                                type: "string",
                                path: "masterCategory",
                                numBuckets: 200 // Set this to a higher number to get more unique values
                            },
                        },
                    },
                },
            },
        ]
    const result = await collection.aggregate(pipeline).toArray();
    return NextResponse.json({ facets: result }, { status: 200 });
}