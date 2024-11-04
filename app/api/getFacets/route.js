import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection("products");
    const facets = await collection.aggregate([
        {
            $searchMeta: {
                index: "facets",
                facet: {
                    facets: {
                        brand: {
                            type: "string",
                            path: "brand",
                        },

                        masterCategory: {
                            type: "string",
                            path: "masterCategory",
                        },
                    },
                },
            },
        },
    ]).toArray();
    console.log('facets', facets)
    return NextResponse.json({ facets }, { status: 200 });


}