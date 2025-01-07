"use client";

import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Card from "@leafygreen-ui/card";
import { H3, Subtitle } from '@leafygreen-ui/typography';
import Badge from "@leafygreen-ui/badge";

import styles from "./orderItemCard.module.css";
import Button from "@leafygreen-ui/button";
import { clearOrder } from "@/redux/slices/OrderSlice";
import { shippingMethods } from "@/lib/constants";
import ShippingMethodBadgeComp from "../shippingMethodBadgeComp/ShippingMethodBadgeComp";
import { deleteOrder } from "@/lib/api";


const prettifyDateFormat = (timestamp) => {
    const date = new Date(timestamp);
    // Format the date part (e.g., "Jan 1, 2000")
    const datePart = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    // Format the time part (e.g., "12:00:00 AM")
    const timePart = date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return `${datePart} at ${timePart}`;
}

const OrderItemCard = ({ order, updateToggle }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [keysPressed, setKeysPressed] = useState(new Set());

    const onSeeOrderClick =  () => {
        router.push(`/orderDetails/${order._id}`);
        dispatch(clearOrder())
    }
    const onOrderClick = async () => {
        if(!keysPressed.has('d'))
            return
        const result = await deleteOrder(order._id);

    }

    useEffect(() => {
        const totalPrice = order.products?.reduce((sum, product) => sum + (parseFloat(product.price.amount) * parseInt(product.amount || 1)), 0);
        setTotalPrice(totalPrice)
        const totalAmount = order.products?.reduce((sum, product) => sum + parseInt(product.amount || 1), 0);
        setTotalAmount(totalAmount)
    }, [updateToggle])
    
    useEffect(() => {
        const handleKeyDown = (event) => {
          setKeysPressed((prev) => new Set(prev).add(event.key));
        };
    
        const handleKeyUp = (event) => {
          setKeysPressed((prev) => {
            const newSet = new Set(prev);
            newSet.delete(event.key);
            return newSet;
          });
        };
    
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
        };
      }, []);

    return (
        <Card className={styles.OrderItemCard} onClick={() => onOrderClick()}>
            <div className="d-flex align-items-center">
                <H3 className='me-3'>Order #{order._id}</H3>
                {
                    order.type.toLowerCase().includes('home')
                    ? <ShippingMethodBadgeComp orderDetails={{shippingMethod: shippingMethods.home}}/>
                    : order.type.toLowerCase().includes('store')
                    ? <ShippingMethodBadgeComp orderDetails={{shippingMethod: shippingMethods.bopis}}/>
                    : <Badge variant='lightgrey'>{order.type}</Badge>
                }
            </div>
            <div className={styles.container}>
                <div className={`${styles.item} ${styles.fullWidth} me-2`}>
                    <Subtitle className={`mb-2 ${styles.orderedDate}`}>Ordered on {prettifyDateFormat(order.status_history[0]?.timestamp)}</Subtitle>
                    <p className={styles.orderData}>Status: {order.status_history[order.status_history.length - 1]?.status}</p>
                    <p className={styles.orderData}>Products: {totalAmount} item{totalAmount > 1 ? 's' : ''} </p>
                    <p className={styles.orderData}>Total: ${totalPrice} </p>
                    
                </div>
                <div className={`${styles.item} ${styles.fitContent}`}>
                    <Button
                        variant='primary'
                        onClick={() => onSeeOrderClick()}
                    >
                        See details
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default OrderItemCard;
