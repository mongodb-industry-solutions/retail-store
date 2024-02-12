"use client";

import { useState } from "react";
import styles from "./productCard.module.css";
import PropTypes from 'prop-types';


import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Label, Description } from '@leafygreen-ui/typography';
import CartAdd from "../cartAdd/CartAdd";
import Modal from "@leafygreen-ui/modal";
import Button from "@leafygreen-ui/button";

const ProductCard = ({ photo, name, brand, elasticity, price }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.productContainer}>

            <LeafyGreenProvider>
                <Card className={styles.card} onClick={() => setOpen((o) => !o)}>

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

                        <div>

                            <Modal className={styles.modal} open={open} setOpen={setOpen}>

                                <div className={styles.detailModal}>
                                    <div className={styles.detailPhoto}>
                                        <img src={photo} alt={name} width={400} height={400}></img>
                                    </div>

                                    <div className={styles.detailInfo}>
                                        <Label className={styles.productName}>{name}</Label>
                                        <Description>{brand}</Description>
                                        <Label className={styles.elasticity}>Price Elasticity: {elasticity}</Label>
                                        <Subtitle>${price}</Subtitle>
                                        <Button className={styles.detailCart}>
                                            <img src="/cart.png" alt="Add Cart" width={18} height={18} />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
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
    price: PropTypes.string.isRequired,
};

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default ProductCard;
