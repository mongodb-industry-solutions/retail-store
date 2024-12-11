import { NextResponse } from "next/server";
import { closeDatabase, connectToDatabase } from "../../_db/connect";
const { ObjectId } = require('mongodb');

export async function POST(request) {
    try {
        let { userId, numProducts = 0, productsToAdd = [] } = await request.json();
        const db = await connectToDatabase();
        const productsCollection = db.collection('products');
        const cartsCollection = db.collection('carts');

        if ((!numProducts || isNaN(numProducts) || numProducts < 1) && productsToAdd.length === 0) {
            numProducts = 5;
        }

        productsToAdd = productsToAdd.map(product => ({
            amount: 1,
            brand: product.brand,
            code: product.code,
            description: product.description,
            _id: product._id,
            image: { url: product.image.url },
            name: product.name,
            price: {
                amount: Number(product.price.amount) || Number(product.price),
                currency: product.price.currency || product.currency
            }
        }));
        
        if (numProducts > 0) {
            // Retrieve N random products from the 'products' collection
            const selectedProducts = await productsCollection
                .aggregate([
                    { $sample: { size: numProducts } }
                ]).toArray();

            //console.log('selectedProducts', selectedProducts);

            // Prepare the products to be added to the cart
            let randomProducts = selectedProducts.map(product => ({
                amount: 1,
                brand: product.brand,
                code: product.code,
                description: product.description,
                _id: product._id,
                image: { url: product.image.url },
                name: product.name,
                price: {
                    amount: product.price.amount,
                    currency: product.price.currency
                }
            }));
            productsToAdd = productsToAdd.concat(randomProducts)
        }

        console.log('userId', userId)
        // Use findOneAndUpdate to upsert the cart and return the updated document
        const result = await cartsCollection.findOneAndUpdate(
            { user: ObjectId.createFromHexString(userId) }, // Query to find the cart by userId
            {
                $setOnInsert: { _id: new ObjectId(), user: ObjectId.createFromHexString(userId) }, // Set a new _id and user if inserting
                $push: { products: { $each: productsToAdd } } // Push new products to the array
            },
            {
                upsert: true, // Create a new document if no document matches the query
                returnDocument: 'after' // Return the document after the update
            }
        );

        return NextResponse.json({ cart: result }, { status: 200 });
    } catch (error) {
        console.error('Error creating or updating cart:', error);
        return new Response('Error creating or updating cart', { status: 500 });
    } finally {
        //await closeDatabase(); // Close the MongoDB client connection
    }
}
