import { NextResponse } from "next/server";
import { closeDatabase, connectToDatabase } from "../../_db/connect";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    try {
        let { userId, numProducts} = await request.json();
        console.log(userId, numProducts)
        const db = await connectToDatabase();
        const productsCollection = db.collection('products');
        const cartsCollection = db.collection('carts');
    
        if (!numProducts || isNaN(numProducts) || numProducts < 1)
            numProducts = 5
    
        // Retrieve N random products from the 'products' collection
        const selectedProducts = await productsCollection
            .aggregate([
                { $sample: { size: numProducts } }
            ]).toArray();
        
        console.log('selectedProducts', selectedProducts)
        // Insert the selected products into the 'orders' collection
        const cart = {
            _id: new ObjectId(),
            products : selectedProducts.map(product =>  ({
                amount: 1,
                brand: product.brand,
                code: product.code,
                description: product.description,
                _id: new ObjectId(product._id),
                image: { url: product.image.url},
                name: product.name,
                price: {
                    amount: product.price.amount,
                    currency: product.price.currency
                }
            })),
            user: new ObjectId(userId)
        };
      
        await cartsCollection.insertOne(cart);
    
        return NextResponse.json({ cart: cart }, { status: 200 });
    }  catch (error) {
        console.error('Error creating cart:', error);
        return new Response('Error creating cart', { status: 500 });
      } finally {
        //await closeDatabase (); // Close the MongoDB client connection
      }
}