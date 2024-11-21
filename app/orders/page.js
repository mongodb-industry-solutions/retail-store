"use client"

import React, {useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { H1 } from '@leafygreen-ui/typography';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import OrderItemCard from '../_components/orderItemCard/OrderItemCard';
import { CardSkeleton } from '@leafygreen-ui/skeleton-loader';
import { handleChangeInOrders } from '@/lib/helpers';

export default function Page() {
    const [sseConnection, setSSEConnection] = useState(null)
    const userId = useSelector(state => state.User.selectedUser?._id)
    const orders = useSelector(state => state.User.orders)

    const listenToSSEUpdates = useCallback((userId) => {
        console.log('listenToSSEUpdates func')
        const eventSource = new EventSource(`/api/sse?userId=${userId}`)

        eventSource.onopen = () => {
          console.log('SSE connection opened.')
          // Save the SSE connection reference in the state
        }

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received SSE Update:',  data);
            // validate if the change was on the status_history field            
            const orderId = data.documentKey._id
            handleChangeInOrders(orderId, data.fullDocument)
        }

        eventSource.onerror = (event) => {
          console.error('SSE Error:', event);
        }
        setSSEConnection(eventSource);
        return eventSource;
    }, []);

    useEffect(() => {
        if(userId){
            const eventSource = listenToSSEUpdates(userId);
            return () => {
                if (eventSource) {
                    eventSource.close();
                    console.log('SSE connection closed.');
                }
            }
        }
    }, [listenToSSEUpdates, userId]);

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
                            <OrderItemCard 
                                key={index} 
                                order={order} 
                                updateToggle={orders.updateToggle}
                            />
                        ))
                    }
                </div>
            </Container>
            <Footer/>
        </>
    );
}
