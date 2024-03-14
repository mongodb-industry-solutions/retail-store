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
                    },
                },
            },
        },
    ]).toArray();

    console.log(facets)

    return NextResponse.json({ products }, { status: 200 });


}