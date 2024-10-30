
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { H1, H3, Disclaimer, Body } from '@leafygreen-ui/typography';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import { Container } from 'react-bootstrap';
import Button from "@leafygreen-ui/button";
import { fetchCart, fillCartRandomly } from '@/lib/api';
import { setCartProductsList, setLoading } from '@/redux/slices/CartSlice';
import CartItem from '../_components/cart/CartItem';

export default function Page() {
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.User.selectedUser);
    const cart = useSelector(state => state.Cart);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const onCheckout = () => {
        // Todo: process cart and move to checkout page
    }

    const onFillCart = async () => {
        if (selectedUser !== null && cart.products?.length < 1) {
            try {
                const result = await fillCartRandomly();
                // Todo: process result and render returned cart
            } catch (err) {
                console.log(`Error filling cart ${err}`)
            }
        }
    }

    useEffect(() => {
        const getCart = async () => {
            try {
                const result = await fetchCart(selectedUser._id);
                if (result !== null) {
                    dispatch(setCartProductsList(result))
                }
                dispatch(setLoading(false))
            } catch (err) {
                console.log(`Error fetching cart ${err}`)
            }
        }
        getCart();

        return () => { }
    }, [selectedUser]);

    useEffect(() => {
        const totalP = cart.products.reduce((sum, product) => sum + (product.price.amount * product.amount), 0);
        const totalA = cart.products.reduce((sum, product) => sum + product.amount, 0);
        setTotalPrice(totalP);
        setTotalAmount(totalA);
    }, [cart.products?.length])

    return (
        <>
            <Navbar></Navbar>
            <Container className=''>
                <div className='d-flex align-items-end'>
                    <H1>My cart</H1>
                    <Button
                        size='small'
                        className='ms-3 mb-2'
                        disabled={cart.loading || cart.error || cart.products?.length > 0}
                        onClick={() => onFillCart()}
                    >
                        Fill cart
                    </Button>
                </div>
                <div className='mt-3'>
                    <H3 className="mb-2">Products</H3>
                    {
                        cart.loading === true
                            ? [0, 1, 2].map((item) => (
                                <CartItem
                                    key={`loading-product-${item}`}
                                    product={null}
                                />
                            ))
                            : cart.products?.length > 0
                            ? <div>
                                {cart.products.map((product, index) => (
                                    <CartItem
                                        key={`cart-product-${index}`}
                                        product={product}
                                    />
                                ))}
                                <div className='d-flex flex-row-reverse mt-3'>
                                    <Body>Subtotal ({totalAmount} product{totalAmount > 1 ? 's' : ''}): <strong>${totalPrice}</strong></Body>
                                </div>
                                <div className='d-flex flex-row-reverse mt-3'>
                                    <Button
                                        variant='primary'
                                        onClick={() => onCheckout()}
                                    >
                                        Proceed to checkout
                                    </Button>
                                </div>
                            </div>
                            : <Disclaimer className='mt-5'>No products found, click on the button above to fill the cart with products</Disclaimer>
                    }
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
}
