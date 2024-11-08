"use client";
/*
    This is a modal that displays a list of CART ITEMS 
    (currently we pass the cart products)
*/
import React, {useEffect} from 'react';

import { Modal, Container } from 'react-bootstrap';
import CartItem from '../cart/CartItem';
import Icon from '@leafygreen-ui/icon';

const ProductsModalComp = ({ open, handleClose, products = [] }) => {
    
    return (
        <Modal
            show={open}
            onHide={handleClose}
            className={`modalLeafyFeel`}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={'md-down'}
            backdrop="static"
        >
            <Container className='p-3 h-100'>
                <div className='d-flex flex-row-reverse p-1 cursorPointer' onClick={handleClose}>
                    <Icon glyph="X" />
                </div>
                {
                    products.map(product => 
                        <CartItem 
                            key={product._id} 
                            product={product} 
                        />
                    )
                }
            </Container>

        </Modal>
    );
};

export default ProductsModalComp;

/*
{
    "amount": {
        "$numberInt": "2"
    },
    "brand": "Indigo",
    "code": "INMPBT-MDB0001",
    "description": "Indigo Nation Men Printed Black T-shirt",
    "id": {
        "$oid": "65e1e313cffbb90f3409a3cf"
    },
    "image": {
        "url": "http://assets.myntassets.com/v1/images/style/properties/7a1bc7d255671c7f4b85f1b1b35e945b_images.jpg"
    },
    "name": "Indigo Nation Men Printed Black T-shirt",
    "price": {
        "amount": {
        "$numberDouble": "20.0"
        },
        "currency": "USD"
    }
}
*/