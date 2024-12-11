"use client"

import React, { useState } from 'react';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import Code from '@leafygreen-ui/code';

import ModalContainer from '../modalContainer/ModalContainer';
import './cartIndexModal.module.css'
import Image from 'next/image';

const CartIndexModal = (props) => {
    const { open, setOpen } = props;
    const [selected, setSelected] = useState(0)
    const codeSnippet = `
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
    `
    return (
        <ModalContainer
            allowClose={true}
            open={open}
            setOpen={setOpen}
            children={
                <Tabs setSelected={setSelected} selected={selected}>
                    <Tab name="Schema">
                        <h3 className='mt-2'>Cart Schema</h3>
                        <div >
                            <Image
                                src="/rsc/images/cartSchema.png"
                                alt="Cart Schema"
                                loading='lazy'
                                width={600}
                                height={300}
                            />
                        </div>
                    </Tab>
                    <Tab name="Unique indexes">
                        <h3 className='mt-2'>Cart Consistency through Unique indexes</h3>
                        <p>It is importtant for an e-commerce that a user has one single cart instance across their sessions. No mater in which device or at what time they look at their cart it must be the same cart instance.</p>
                        <p>How do we ensure this? Through <strong><a href="https://www.mongodb.com/docs/manual/core/index-unique/" target='_blank'>unique indexes</a></strong></p>
                        <p>A unique index ensures that the indexed fields do not store duplicate values. A unique index on a single field ensures that a value appears at most once for a given field. Thats how we make sure each user has at most one cart.</p>
                        <div >
                            <Image
                                src="/rsc/images/cartIndex.png"
                                alt="Index creation form"
                                loading='lazy'
                                width={750}
                                height={650}
                            />
                        </div>
                    </Tab>
                    <Tab name="Upsert">
                        <h3 className='mt-2'>Cart Consistency through Upsert</h3>
                        <p>Instead of performing <i>insertOne()</i> to avoid having multiple carts we use <i>findOneAndUpdate</i> to Updates a single document based on the filter and sort criteria.</p>
                        <p>What if the cart hasn't been created yet? We use <strong>upsert: true</strong>. Creates a new document if no documents match the filter. For more details see <a href='https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-behavior' target='_blank'>upsert behavior.</a></p>
                        <Code language="javascript">{codeSnippet}</Code>
                        <p>Learn more about <a href='https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/' target='_blank'>findOneAndUpdate</a></p>
                    </Tab>
                </Tabs>
            }
        />
    );
};

export default CartIndexModal;