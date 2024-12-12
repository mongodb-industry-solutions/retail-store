import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";

export async function POST(request) {
    const { query, facets } = await request.json();
    console.log('HOLA', query, facets);

    try {
        const db = await connectToDatabase();
        const collection = db.collection("products");

        // Build the aggregation pipeline
        const pipeline = [];

        // Conditionally add the $search stage if query is not empty
        if (query) {
            pipeline.push({
                $search: {
                    index: 'product_id', // Replace with your index name
                    text: {
                        query: query,
                        path: 'name', // Replace with the field you want to search
                    },
                },
            });
        }

        // Add facet filtering stages if facets are provided
        if (facets) {
            const { selectedBrands, selectedCategories } = facets;

            if (selectedBrands && selectedBrands.length > 0) {
                pipeline.push({
                    $match: {
                        brand: { $in: selectedBrands }
                    }
                });
            }

            if (selectedCategories && selectedCategories.length > 0) {
                pipeline.push({
                    $match: {
                        masterCategory: { $in: selectedCategories }
                    }
                });
            }
        }

        // Add the $addFields and $limit stages
        pipeline.push(
            {
                $addFields: {
                    searchScore: { $meta: "searchScore" }
                }
            },
            {
                $limit: 3000, // Limit the number of results
            }
        );

        // Perform the aggregation query
        const products = await collection.aggregate(pipeline).toArray();

        // Transform the array of products into an object with _id as the key
        const transformedProducts = products.reduce((acc, product) => {
            acc[product._id] = {
                ...product,
                _id: product._id,
                id: product.id,
                photo: product.image.url,
                name: product.name,
                brand: product.brand,
                price: `${product.price.amount.toFixed(2)}`,
                pred_price: `${product.pred_price.toFixed(2)}`,
                items: product.items,
                searchScore: product.searchScore
            };
            return acc;
        }, {});

        console.log('RESULTS LENGTH: ', products.length);
        return NextResponse.json({ products: transformedProducts }, { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
