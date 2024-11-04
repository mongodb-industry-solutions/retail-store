
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { H1, H3, Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { RadioBox, RadioBoxGroup } from '@leafygreen-ui/radio-box-group';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import { Container } from 'react-bootstrap';
import Button from "@leafygreen-ui/button";
import { fetchCart, fetchStoreLocations } from '@/lib/api';
import { setCartProductsList, setLoading } from '@/redux/slices/CartSlice';
import styles from './checkout.module.css'
import Card from '@leafygreen-ui/card';
import HomeAddressComp from '../_components/homeAddressComp/homeAddressComp';
import BopisComp from '../_components/bopisComp/BopisComp';
import ProductsModalComp from '../_components/productsModalComp/ProductsModalComp';
import { CardSkeleton } from '@leafygreen-ui/skeleton-loader';

const shippingMethods = [
    {value: 'home', label: 'Send to my home address'},
    {value: 'bopis', label: 'Pick up in store'}
]

export default function Page() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.Cart);
    const selectedUser = useSelector(state => state.User.selectedUser);
    const [shippingMethod, setShippingMethod] = useState(shippingMethods[0].value)
    const [storeLocations, setStoreLocations] = useState([])
    const [selectedStoreLocation, setSelectedStoreLocation] = useState(null)
    const [productDetailsOpened, setProductDetailsOpened] = useState(false)
    
    const onConfirmOrder = () => {
        // TODO: create order backend part
    }

    const onShippingMethodChange = (e) => {
        setShippingMethod(e.target.value)
        setSelectedStoreLocation(null)
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
        if (cart.loading === true && selectedUser !== null)
            getCart();

        return () => { }
    }, [selectedUser, cart.loading]);

    useEffect(() => {
        const getStoreLocations = async () => {
            try {
                const result = await fetchStoreLocations();
                console.log('result', result)
                if (result !== null) {
                    setStoreLocations(result)
                }
            } catch (err) {
                console.log(`Error fetching cart ${err}`)
            }
        }
        
        getStoreLocations();

      return () => {}
    }, [])
    

    return (
        <>
            <Navbar></Navbar>
            <Container className=''>
                <div className='d-flex align-items-end'>
                    <H1>Checkout</H1>
                </div>
                {
                    cart.loading
                        ? <div className='mt-3'>
                            <H3 className="mb-2">Payment details</H3>
                            <CardSkeleton />
                            <H3 className="mb-2 mt-3">Products</H3>
                            <CardSkeleton />
                            <H3 className="mb-2 mt-3">Shipping address</H3>
                            <CardSkeleton />
                        </div>
                        : cart.products?.length < 1
                        ? <div>
                            Fill cart randomly 
                            {/* TODO backend part to add random items to cart */}
                        </div>
                        : <div className='mt-3'>
                            <H3 className="mb-2">Payment details</H3>
                            <Card className={styles.cardInfo}>
                                <Body><strong>Order: </strong>${cart.totalPrice}</Body>
                                <Body><strong>Shipping: </strong>$0</Body>
                                <Body><strong>Total: </strong>${cart.totalPrice}</Body>
                            </Card>

                            <H3 className="mb-2 mt-3">Products</H3>
                            <Card className={styles.cardInfo}>
                                <Body><strong>Amount: </strong>{cart.totalAmount} items in cart <Icon onClick={() => setProductDetailsOpened(true)} className="cursorPointer" glyph="Visibility" /></Body>
                            </Card>

                            <H3 className="mb-2 mt-3">Shipping address</H3>
                            <Card className={styles.cardInfo}>
                                <RadioBoxGroup 
                                    onChange={(e) => onShippingMethodChange(e)} 
                                    className="radio-box-group-style mb-3"
                                >
                                    {
                                        shippingMethods.map((method, index) => (
                                            <RadioBox 
                                                checked={index == 0} 
                                                value={method.value}
                                            >
                                                {method.label}
                                            </RadioBox>

                                        ))
                                    }
                                </RadioBoxGroup>
                                {
                                    shippingMethod === shippingMethods[0].value // home
                                    ? <HomeAddressComp address={selectedUser.address} containerStyle={styles.cardInfo}/>
                                    :  shippingMethod === shippingMethods[1].value // bopis
                                    ? <BopisComp containerStyle={styles.cardInfo} storeLocations={storeLocations} setSelectedStoreLocation={setSelectedStoreLocation}/>
                                    : 'Unrecognized shipping method, please select another option'
                                }
                            </Card>

                            <div className='d-flex flex-row-reverse mt-3'>
                                <Button
                                    variant='primary'
                                    disabled={cart.products?.length === 0 || (shippingMethod === 'bopis' && selectedStoreLocation === null )}
                                    onClick={() => onConfirmOrder()}
                                >
                                    Confirm & order
                                </Button>
                            </div>
                        </div>
                }
            </Container>
            <Footer></Footer>
            <ProductsModalComp  
                open={productDetailsOpened} 
                handleClose={() => setProductDetailsOpened(false)}
                products={cart.products}
            />
        </>
    );
}
