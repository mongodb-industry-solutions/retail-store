"use client";

import React from 'react';
import Card from '@leafygreen-ui/card';
import { Skeleton } from '@leafygreen-ui/skeleton-loader';
import { Subtitle, Body } from '@leafygreen-ui/typography';

import styles from "./cart.module.css";

const CartItem = ({ product = null }) => {

    return (
        <Card
            className={`${styles.cartProductCard}`}
        >
            {
                product === null
                ? <>
                    <Skeleton id="imageSkeleton" className={styles.responsiveImage}></Skeleton>
                    <div className={styles.productInfo}>
                        <Skeleton className='mb-2'></Skeleton>
                        <Skeleton className='mb-2'></Skeleton>
                        <Skeleton className='mb-2'></Skeleton>
                        <Skeleton className=''></Skeleton>
                    </div>
                </>
                : <>
                    <img src={`${product.image.url}`} className={styles.responsiveImage}/>
                    <div className={styles.productInfo}>
                        <Subtitle>{product.name}</Subtitle>
                        <Body className={`weightNormal mt-2 mb-2`}>{product.description}</Body>
                        <Subtitle className={`weightNormal mt-2 mb-2`}>${product.price.amount}</Subtitle>
                        <Subtitle className={`weightNormal`}>Amount: {product.amount}</Subtitle>
                    </div>
                </>
            }

        </Card>
    );
};

export default CartItem;

/*
{
    "amount": {
        "$numberInt": "2"
    },
    "brand": "Indigo",
    "code": "INMPBT-MDB0001",
    "description": "Indigo Nation Men Printed Black T-shirt",
    "id": {
        "$oid": "65e1e313cffbb90f3409a3cf"
    },
    "image": {
        "url": "http://assets.myntassets.com/v1/images/style/properties/7a1bc7d255671c7f4b85f1b1b35e945b_images.jpg"
    },
    "name": "Indigo Nation Men Printed Black T-shirt",
    "price": {
        "amount": {
        "$numberDouble": "20.0"
        },
        "currency": "USD"
    }
}
*/