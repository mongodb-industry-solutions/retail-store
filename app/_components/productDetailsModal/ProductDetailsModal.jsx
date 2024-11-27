"use client";

import { useState, useEffect } from "react";
import Icon from '@leafygreen-ui/icon';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./productDetailsModal.module.css";
import {
    Subtitle,
    Label,
    Description,
} from "@leafygreen-ui/typography";
import { Modal, Container } from 'react-bootstrap';
import Button from "@leafygreen-ui/button";
import Image from "next/image";
import { setOpenedProductDetails } from "@/redux/slices/ProductsSlice";
import { updateCartProduct } from "@/lib/api";
import { setCartProductsList } from "@/redux/slices/UserSlice";

const ProductDetailsModal = () => {
    const openedProductDetails = useSelector(state => state.Products.openedProductDetails)
    const dispatch = useDispatch();
    const userId = useSelector(state => state.User.selectedUser?._id)
    const cartProducts = useSelector(state => state.User.cart?.products)
    const [isInCart, setIsInCart] = useState(cartProducts.some(obj => obj._id === openedProductDetails?.id))
    
    const handleClose = () => {
        dispatch(setOpenedProductDetails(null))
    }
    const onAddToCartClick = async () => {
        if(isInCart) // TODO temporary while we implement remove from cart
            return;
        try {
            //const addToCart = cartProducts.some(obj => obj._id === openedProductDetails.id);
            console.log(openedProductDetails)
            const cart = await updateCartProduct(userId, openedProductDetails.id, isInCart);
            console.log('result', cart)
            if(cart){
                setIsInCart(!isInCart)
                dispatch(setCartProductsList(cart))
            }
        } catch (err) {
            console.log(`Error filling cart ${err}`)
        }
    }

    useEffect(() => {
        let _isInCart = cartProducts.some(obj => obj._id === openedProductDetails?.id)
        setIsInCart(_isInCart)
    }, [openedProductDetails?.id])
    

    return (
        <Modal
            show={openedProductDetails !== null}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={'md-down'}
            className={styles.leafyFeel}
            backdrop="static"
        >
            <Container className='p-3 h-100'>
                <div className='d-flex flex-row-reverse p-1 cursorPointer' onClick={handleClose}>
                    <Icon glyph="X" />
                </div>
                {
                    openedProductDetails !== null &&
                    <div className={styles.detailModal}>
                        <div className={styles.detailPhoto}>
                            <img src={openedProductDetails.photo} alt={openedProductDetails.name} width={400} height={400}></img>
                        </div>
                        <div className={styles.detailInfo}>
                            <Label className={styles.productName}>{openedProductDetails.name}</Label>
                            <Description>{openedProductDetails.brand}</Description>
                            <Subtitle className={styles.price}>${openedProductDetails.price}</Subtitle>

                            <Button
                                className={styles.detailCart}
                                disabled={isInCart} // TODO temporary while we implement remove from cart
                                onClick={() => onAddToCartClick()}
                            >
                                <img
                                    src="/cart.png"
                                    alt="Add Cart"
                                    width={18}
                                    height={18}
                                />
                                {
                                // TODO commented temporary while we implement remove from cart
                                //isInCart ? 'Remove from' : 'Add to'
                                } Add to Cart
                            </Button>
                        </div>
                    </div>
                }
            </Container>
        </Modal>
    );
};

export default ProductDetailsModal;
