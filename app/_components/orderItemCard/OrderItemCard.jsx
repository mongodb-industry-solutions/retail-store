"use client";

import React, {useEffect, useState} from "react";
import Card from "@leafygreen-ui/card";
import { H3, Subtitle } from '@leafygreen-ui/typography';
import Badge from "@leafygreen-ui/badge";

import styles from "./orderItemCard.module.css";
import Button from "@leafygreen-ui/button";

const OrderItemCard = ({ order }) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const onOrderClick = () => {
        // TODO route to order details page
    }

    useEffect(() => {
        const totalPrice = order.products?.reduce((sum, product) => sum + (parseFloat(product.price.amount) * parseInt(product.amount || 1)), 0);
        setTotalPrice(totalPrice)
        const totalAmount = order.products?.reduce((sum, product) => sum + parseInt(product.amount || 1), 0);
        setTotalAmount(totalAmount)
    }, [])
    

    return (
        <Card className={styles.OrderItemCard} >
            <div className="d-flex align-items-center">
                <H3 className='me-3'>Order #{order._id}</H3>
                {
                    order.type === 'Ship to Home'
                    ? <Badge variant='blue'>Buy Online, Get Delivery at Home</Badge>
                    : order.type === 'Buy Online Pickup in Store'
                    ? <Badge variant='yellow'>Buy Online, Pick Up in Store</Badge>
                    : <Badge variant='lightgrey'>{order.type}</Badge>
                }
            </div>
            <div className={styles.container}>
                <div className={`${styles.item} ${styles.fullWidth} me-2`}>
                    <Subtitle className={`mb-2 ${styles.orderedDate}`}>Ordered on {order.status_history[0]?.timestamp}</Subtitle>
                    <p className={styles.orderData}>Status: {order.status_history[order.status_history.length - 1]?.status}</p>
                    <p className={styles.orderData}>Products: {totalAmount} item{totalAmount > 1 ? 's' : ''} </p>
                    <p className={styles.orderData}>Total: ${totalPrice} </p>
                    
                </div>
                <div className={`${styles.item} ${styles.fitContent}`}>
                    <Button
                        variant='primary'
                        onClick={() => onOrderClick()}
                    >
                        See details
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default OrderItemCard;
