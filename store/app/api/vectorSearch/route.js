import { NextResponse } from "next/server";
import createEmbedding from "../createEmbeddings/route";
import { clientPromise } from "@/app/_lib/mongodb";
import { PAGINATION_PER_PAGE } from "@/app/_lib/constants";

export async function POST(request) {
  let { query, facets, pagination_page } = await request.json();

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
    console.log('error: ', error)
  }

  const EMBEDDING_FIELD_NAME = "embedding_desc_name_brand";
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("products");

  const pipeline = [
    {
      $vectorSearch: {
        index: 'vector_index_products',
        path: EMBEDDING_FIELD_NAME,
        queryVector: embeddedSearchTerms,
        numCandidates: 3000,
        limit: 3000
      }
    },
    {
      $addFields: {
        searchScore: { $meta: "vectorSearchScore" }
      }
    }
  ]

  // Apply facets filtering if provided
  if (facets) {
    const { selectedBrands, selectedCategories } = facets;

    let matchStage = {};

    if (selectedBrands && selectedBrands.length > 0) {
      matchStage.brand = { $in: selectedBrands };
    }

    if (selectedCategories && selectedCategories.length > 0) {
      matchStage.masterCategory = { $in: selectedCategories };
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
  }

  // Query 1: Get total count of matching documents
  const totalCount = await collection.aggregate(pipeline.concat([{ $count: "total" }])).toArray();
  const totalItems = totalCount.length > 0 ? totalCount[0].total : 0;

  // Query 2: Get paginated results
  const products = await collection
    .aggregate(pipeline)//.toArray(); 
    .skip(PAGINATION_PER_PAGE * pagination_page)
    .limit(PAGINATION_PER_PAGE)
    .toArray();
  console.log('DOS', new Date())

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
  console.log('TRES', new Date())

  return NextResponse.json({ products: transformedProducts, totalItems: totalItems }, { status: 200 });

}