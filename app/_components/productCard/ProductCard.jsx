"use client";

import { useState } from "react";
import styles from "./productCard.module.css";
import PropTypes from 'prop-types';


import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Label, Description } from '@leafygreen-ui/typography';
import CartAdd from "../cartAdd/CartAdd";



const ProductCard = ({ photo, name, brand, elasticity, price }) => {

    return (
        <div className={styles.productContainer}>

            <LeafyGreenProvider>
                <Card className={styles.card}>

                    <div className={styles.productInfo}>
                        <img src={photo} alt={name} width={200} height={200}></img>
                        <Label className={styles.productName}>{name}</Label>
                        <Description>{brand}</Description>
                        <Label className={styles.elasticity}>Price Elasticity: {elasticity}</Label>
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.subtitle}>
                            <Subtitle>${price}</Subtitle>
                        </div>
                        <div className={styles.cartAdd}>
                            <CartAdd></CartAdd>
                        </div>
                    </div>

                </Card>


            </LeafyGreenProvider>

        </div>
    );
};

ProductCard.propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    elasticity: PropTypes.string.isRequired,
    price:PropTypes.string.isRequired,
  };

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default ProductCard;
