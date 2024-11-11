"use client" // app/order-details/[id]/page.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from "@/app/_components/footer/Footer";
import Navbar from "@/app/_components/navbar/Navbar";
import { H1, H3 } from '@leafygreen-ui/typography';
import Banner from "@leafygreen-ui/banner";
import { Container } from "react-bootstrap";
import { fetchOrderDetails } from '@/lib/api';
import { setLoading, setOrder } from '@/redux/slices/OrderSlice';

import styles from '../orderDetails.module.css';
import Card from '@leafygreen-ui/card';
import CartItem from '@/app/_components/cart/CartItem';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Stepper, { Step } from '@leafygreen-ui/stepper';
import { CardSkeleton, Skeleton } from '@leafygreen-ui/skeleton-loader';
import Badge from '@leafygreen-ui/badge';

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

export default function OrderDetailsPage({ params }) {
    const dispatch = useDispatch();
    const { orderId } = params; // id from the dynamic URL
    const orderDetails = useSelector(state => state.Order)

    const onArrivedToStoreClick = () => {
        if (!orderDetails.packageIsInTheStore)
            return
        console.log('onArrivedToStoreClick')
    }

    useEffect(() => {
        const getOrderDetails = async () => {   // fetch the order 
            try {
                const result = await fetchOrderDetails(orderId);
                if (result) {
                    dispatch(setOrder(result))
                }
                dispatch(setLoading(false))
            } catch (err) {

            }
        };
        getOrderDetails();
        return () => { }
    }, [orderId]);

    return (
        <>
            <Navbar></Navbar>
            <Container className=''>
                <div className='d-flex align-items-end'>
                    <H1>Order details</H1>
                </div>
                <div className='mt-3'>
                    <H3 className="mb-2">Summary</H3>
                    {
                        orderDetails.loading
                            ? <>
                                <CardSkeleton className='mb-2' />
                                <H3 className="mb-2">Status</H3>
                                <Skeleton className='mb-2' />
                                <Skeleton className='mb-2' />
                                <H3 className="mb-2">Products</H3>
                                <CardSkeleton className='mb-2' />
                                <CardSkeleton />
                            </>
                            : orderDetails._id !== null
                                ? <>
                                    <Card className="row m-0 mb-2">
                                        <div className='col'>
                                            <p className={styles.orderData}><strong>Date:</strong> {prettifyDateFormat(orderDetails.status_history[0]?.timestamp)}</p>
                                            <p className={styles.orderData}><strong>ID:</strong> {orderId}</p>
                                            <p className={styles.orderData}><strong>Status:</strong> {
                                                orderDetails.isCanceled
                                                    ? <Badge variant="red">{orderDetails.status_history[orderDetails.status_history.length - 1]?.status}</Badge>
                                                    : orderDetails.status_history[orderDetails.status_history.length - 1]?.status
                                            }</p>
                                        </div>
                                        <div className='col'>
                                            <p className={styles.orderData}><strong>Type:</strong> {orderDetails.type}</p>
                                            <p className={styles.orderData}><strong>Address:</strong> {orderDetails.shipping_address}</p>
                                        </div>
                                        <div className='col'>
                                            <p className={styles.orderData}><strong>Products:</strong> ${orderDetails.totalPrice} </p>
                                            <p className={styles.orderData}><strong>Shipping:</strong> $0 </p>
                                            <p className={styles.orderData}><strong>Total:</strong> ${orderDetails.totalPrice} </p>
                                        </div>
                                    </Card>
                                    <H3 className="mb-2">Status</H3>
                                    {
                                        !orderDetails.isCanceled &&
                                        <Stepper
                                            className={`${orderDetails.isCanceled ? styles.isCanceled : ''}`}
                                            // if the order is canceled it means that only the first step was completed. 
                                            // because we defined by business rule that we can only cancel an order if the order is in the first stage (a.k.a: In progress)
                                            currentStep={orderDetails.isCanceled ? 1 : orderDetails.status_history.length}
                                        >
                                            {
                                                orderDetails.shippingMethod?.steps.map(step =>
                                                    <Step key={step.id}>{step.label}</Step>
                                                )
                                            }
                                        </Stepper>
                                    }
                                    {
                                        orderDetails.packageIsInTheStore &&
                                        <Banner className='mb-2 mt-2' image={<Icon glyph="Bell"></Icon>}>
                                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                                <strong className='m-0'>Let the store know you have arrived for your package.</strong>  <Button onClick={() => onArrivedToStoreClick()}>I am here</Button>
                                            </div>
                                        </Banner>
                                    }
                                    {
                                        orderDetails.status_history.map((statusHistory, index) => (
                                            <div key={`${index}-sh`}>
                                                <p><strong>{statusHistory.status}: </strong>{prettifyDateFormat(statusHistory.timestamp)}</p>
                                            </div>
                                        ))
                                    }
                                    <H3 className="mb-2">Products</H3>
                                    {orderDetails.products?.map((product, index) => (
                                        <CartItem
                                            key={`cart-product-${index}`}
                                            product={product}
                                        />
                                    ))}
                                </>
                                : 'error'
                    }
                </div>
            </Container>
            <Footer />
        </>
    );
}
