"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { H1 } from '@leafygreen-ui/typography';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import OrderItemCard from '../_components/orderItemCard/OrderItemCard';
import { CardSkeleton } from '@leafygreen-ui/skeleton-loader';

export default function Page() {
    const orders = useSelector(state => state.User.orders)

    return (
        <>
            <Navbar></Navbar>
            <Container className=''>
                <div className='d-flex align-items-end'>
                    <H1>My orders</H1>
                </div>
                <div className='mt-3 mb-2' >
                    {
                        orders.loading === true
                        ? [0, 1, 2].map(loadCard => (
                            <CardSkeleton className='mb-2' key={loadCard}></CardSkeleton>
                        ))
                        : orders.list.map((order, index) => (
                            <OrderItemCard key={index} order={order} />
                        ))
                    }
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
}










