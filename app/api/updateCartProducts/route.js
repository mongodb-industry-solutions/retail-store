import { NextResponse } from "next/server";  
import { closeDatabase, connectToDatabase } from "../../_db/connect";  
const { ObjectId } = require('mongodb');  
  
export async function POST(request) {  
    try {  
        // addToCart == true --> add product to the cart  
        // addToCart == false --> remove product from the cart 
        // id cart _id is null the we create the cart with the product sent 
        let { userId, product, addToCart, cartId } = await request.json();  
        console.log(userId, product);  
        const db = await connectToDatabase();  
        const cartsCollection = db.collection('carts');  
        let result;  
        
        if(cartId === null){ // create the cart with this product
            
        } else if (addToCart) {   // push product to existing cart
            const productToAdd = {  
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
            };  
            // Use findOneAndUpdate to upsert the cart and return the updated document  
            result = await cartsCollection.findOneAndUpdate(  
                { user: new ObjectId.createFromHexString(userId) }, // Query to find the cart by userId  
                {  
                    $setOnInsert: { _id: new ObjectId(), user: new ObjectId(userId) }, // Set a new _id and user if inserting  
                    $push: { products: productToAdd } // Push new product to the array  
                },  
                {  
                    upsert: true, // Create a new document if no document matches the query  
                    returnDocument: 'after' // Return the document after the update  
                }  
            );  
        } else {   // Remove the product from the cart
            result = await cartsCollection.findOneAndUpdate(
                { user: new ObjectId.createFromHexString(userId) }, // Query to find the cart by userId
                {  
                    $pull: { products: { _id: new ObjectId.createFromHexString(product._id) } } // Remove the product with the specified _id
                },
                {  
                    returnDocument: 'after' // Return the document after the update  
                }
            );  
        }  
        console.log(result)
        return NextResponse.json({ cart: result }, { status: 200 });  
    } catch (error) {  
        console.error('Error creating or updating cart:', error);  
        return new Response('Error creating or updating cart', { status: 500 });  
    } finally {  
        //await closeDatabase(); // Close the MongoDB client connection  
    }  
}
