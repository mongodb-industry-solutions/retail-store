"use client" // app/order-details/[id]/page.js

import React, {useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { H1, H3 } from '@leafygreen-ui/typography';
import Banner from "@leafygreen-ui/banner";
import { Container } from "react-bootstrap";
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Card from '@leafygreen-ui/card';
import Stepper, { Step } from '@leafygreen-ui/stepper';
import { CardSkeleton, Skeleton } from '@leafygreen-ui/skeleton-loader';

import styles from '../orderDetails.module.css';
import Footer from "@/app/_components/footer/Footer";
import Navbar from "@/app/_components/navbar/Navbar";
import CartItem from '@/app/_components/cart/CartItem';
import { handleChangeInOrders, prettifyDateFormat } from '@/lib/helpers';
import { addOrderStatusHistory, fetchOrderDetails } from '@/lib/api';
import { setLoading, setOrder } from '@/redux/slices/OrderSlice';
import { shippingMethods } from '@/lib/constants';
import ShippingMethodBadgeComp from '@/app/_components/shippingMethodBadgeComp/ShippingMethodBadgeComp';

export default function OrderDetailsPage({ params }) {
    const dispatch = useDispatch();
    const [sseConnection, setSSEConnection] = useState(null)
    const { orderId } = params; // id from the dynamic URL
    const orderDetails = useSelector(state => state.Order)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)

    const onArrivedToStoreClick = async () => {
        if (!orderDetails.packageIsInTheStore || isBtnDisabled)
            return
        setIsBtnDisabled(true)
        let result = await addOrderStatusHistory(
            orderId,
            {
                status: shippingMethods.bopis.steps[2].label, 
                timestamp: Number(Date.now())
            }
        );
        if (result) {
            console.log('result', result)
        }
    }

    const listenToSSEUpdates = useCallback((orderId) => {
        console.log('listenToSSEUpdates func')
        const eventSource = new EventSource(`/api/sseOrderDetails?orderId=${orderId}`)

        eventSource.onopen = () => {
            console.log('SSE connection opened.')
            // Save the SSE connection reference in the state
        }

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received SSE Update:', data);
            handleChangeInOrders(orderId, data.fullDocument)
            dispatch(setOrder(data.fullDocument))
        }

        eventSource.onerror = (event) => {
            console.error('SSE Error:', event);
        }
        setSSEConnection(eventSource);
        return eventSource;
    }, []);


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

    useEffect(() => {
        if (orderDetails._id !== null) {
            const eventSource = listenToSSEUpdates(orderDetails._id);
            return () => {
                if (eventSource) {
                    eventSource.close();
                    console.log('SSE connection closed.');
                }
            }
        }
    }, [listenToSSEUpdates, orderDetails._id])


    return (
        <>
            <Navbar/>
            <Container className=''>
                <div className='d-flex align-items-end'>
                    <H1 onClick={() => console.log(orderDetails)}>Order details</H1>
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
                                                    : orderDetails.status_history[orderDetails.status_history.length - 1]?.status === shippingMethods.bopis.steps[3]?.label || orderDetails.status_history[orderDetails.status_history.length - 1]?.status === shippingMethods.home.steps[4]?.label
                                                    ? <Badge variant="green">{orderDetails.status_history[orderDetails.status_history.length - 1]?.status}</Badge>
                                                    : <Badge variant="gray">{orderDetails.status_history[orderDetails.status_history.length - 1]?.status}</Badge>
                                            }</p>
                                        </div>
                                        <div className='col'>
                                            <p className={styles.orderData}><strong>Type:</strong><ShippingMethodBadgeComp orderDetails={orderDetails}/></p>
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
                                        (orderDetails.packageIsInTheStore === true) &&
                                        <Banner className='mb-2 mt-2' image={<Icon glyph="Bell"></Icon>}>
                                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                                <strong className='m-0'>Let the store know you have arrived for your package.</strong>  
                                                <Button disabled={isBtnDisabled} onClick={() => onArrivedToStoreClick()}>I am here</Button>
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
