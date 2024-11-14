import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";
export async function POST(request) {
    const { query, filters } = await request.json();
    console.log('HOLA', query)

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query is required' }), { status: 400 });
    }
    try {
        const db = await connectToDatabase();
        const collection = db.collection("products");
        // Perform the Atlas Search query
        const results = await collection.aggregate([
            {
                $search: {
                    index: 'product_id', // Replace with your index name
                    text: {
                        query: query,
                        path: 'name', // Replace with the field you want to search
                    },
                },
            },
            {
                $addFields: {
                    score: { $meta: "searchScore" }
                }
            },
            {
                $limit: 100, // Limit the number of results
            },
        ]).toArray();
        return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}