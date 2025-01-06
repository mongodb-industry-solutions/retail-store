import { NextResponse } from "next/server";
import { connectToDatabase } from "../../_db/connect";
import createEmbedding from "../createEmbeddings/route";

export async function POST(request) {
    let { query, facets } = await request.json();
    //console.log('aqui, ', query, facets)
    let limit = request?.query?.limit || 12;
    if (!limit || limit > 100) {
      limit = 12;
    }
    if (!query) {
        query = ''
    }
  
    let embeddedSearchTerms = []
    try {
        embeddedSearchTerms = await createEmbedding([query]);    

    } catch (error) {
        console.log('error: ',error)
    }
    const EMBEDDING_FIELD_NAME = "embedding_desc_name_brand";
    const db = await connectToDatabase();
      const products = await db.collection("products").aggregate([  
        {  
          $vectorSearch: {  
            index: 'vector_index_products',  
            path: EMBEDDING_FIELD_NAME,  
            queryVector:  embeddedSearchTerms,
            numCandidates: 30,  
            limit: 30
          }  
        },
        {
          $addFields: {
            searchScore: { $meta: "vectorSearchScore" }
          }
        }
      ]).toArray();
      
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

}