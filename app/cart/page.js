
"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { H1, H3, Disclaimer, Body } from '@leafygreen-ui/typography';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import { Container } from 'react-bootstrap';
import Button from "@leafygreen-ui/button";
import { fetchCart, fillCartRandomly } from '@/lib/api';
import CartItem from '../_components/cart/CartItem';
import { setCartLoading, setCartProductsList } from '@/redux/slices/UserSlice';

export default function CartPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.User.selectedUser);
    const cart = useSelector(state => state.User.cart);

    const onCheckout = () => {
        router.push('/checkout');
    }

    const onFillCart = async () => {
        if (selectedUser !== null && cart.products?.length < 1) {
            try {
                dispatch(setCartLoading(true))
                const cart = await fillCartRandomly(selectedUser._id);
                console.log('result', cart)
                if(cart)
                    dispatch(setCartProductsList(cart))
                dispatch(setCartLoading(false))
            } catch (err) {
                console.log(`Error filling cart ${err}`)
            }
        }
    }

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
                                    <Body>Subtotal ({cart.totalAmount} product{cart.totalAmount > 1 ? 's' : ''}): <strong>${cart.totalPrice}</strong></Body>
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
