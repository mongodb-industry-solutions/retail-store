"use client"

import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { H1 } from '@leafygreen-ui/typography';
import { v4 as uuidv4 } from "uuid";

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import OrderItemCard from '../_components/orderItemCard/OrderItemCard';
import { CardSkeleton } from '@leafygreen-ui/skeleton-loader';
import { handleChangeInOrders, handleCreateNewOrder } from '@/lib/helpers';
import TalkTrackContainer from '../_components/talkTrackContainer/talkTrackContainer';
import { ordersPage } from '@/lib/talkTrack';

export default function Page() {
    const sseConnection = useRef(null);
    const sessionId = useRef(uuidv4());
    const userId = useSelector(state => state.User.selectedUser?._id)
    const orders = useSelector(state => state.User.orders)

    const listenToSSEUpdates = useCallback(() => {
        console.log('listenToSSEUpdates func: ', userId)
        const collection = "orders";
        const user = userId;
        const eventSource = new EventSource(
            `/api/sse?sessionId=${sessionId.current}&colName=${collection}&user=${user}`
        )

        eventSource.onopen = () => {
            console.log('SSE connection opened.')
            // Save the SSE connection reference in the state
        }

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received SSE Update:', data);
            const orderId = data.documentKey._id
            if (data.operationType === 'update')
                handleChangeInOrders(orderId, data.fullDocument)
            else if (data.operationType === 'insert')
                handleCreateNewOrder(data.fullDocument)
        }

        eventSource.onerror = (event) => {
            console.error('SSE Error:', event);
        }

        // Close the previous connection if it exists
        if (sseConnection.current) {
            sseConnection.current.close();
            console.log("Previous SSE connection closed - dashboard.");
        }

        sseConnection.current = eventSource;
        return eventSource;
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const eventSource = listenToSSEUpdates();
            return () => {
                if (eventSource) {
                    eventSource.close();
                    console.log("SSE connection closed.");
                }
            };
        }
    }, [listenToSSEUpdates, userId]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (sseConnection.current) {
                console.info("Closing SSE connection before unloading the page.");
                sseConnection.current.close();
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [sseConnection]);

    return (
        <>
            <Navbar></Navbar>
            <Container className=''>
                <div className='d-flex flex-row'>
                    <div className='d-flex align-items-end w-100'>
                        <H1>My orders</H1>
                    </div>
                    <TalkTrackContainer sections={ordersPage}/>
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
            <Footer />
        </>
    );
}
