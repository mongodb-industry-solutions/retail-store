"use client";

import { useState } from "react";
import styles from "./productCard.module.css";
import PropTypes from 'prop-types';


import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Label, Description } from '@leafygreen-ui/typography';
import Modal from "@leafygreen-ui/modal";
import Button from "@leafygreen-ui/button";
import IconButton from "@leafygreen-ui/icon-button";
import { RadioGroup, Radio } from "@leafygreen-ui/radio-group";


import Image from "next/image";

const ProductCard = ({ photo, name, brand, price, pred_price, items }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.productContainer}>

            <LeafyGreenProvider>
                <Card className={styles.card} onClick={() => setOpen((o) => !o)}>

                    <div className={styles.productInfo}>
                        <img src={photo} alt={name} width={200} height={200}></img>
                        <Label className={styles.productName}>{name}</Label>
                        <Description>{brand}</Description>
                        <Description className={styles.predPrice}>Predicted Price: ${pred_price}</Description>

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
                                        <Description className={styles.predPrice}>Predicted Price: ${pred_price}</Description>

                                        <Subtitle className={styles.price}>${price}</Subtitle>


                                        <RadioGroup name="name-of-input-group" size="xsmall">
                                            {items && items.map((item, index) => (
                                                <label key={index}>
                                                    <Radio value={`option-${index + 1}`} />
                                                    {item.name}
                                                </label>
                                            ))}
                                        </RadioGroup>


                                        <Button className={styles.detailCart}>
                                            <img src="/cart.png" alt="Add Cart" width={18} height={18} />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        </div>

                        <IconButton className={styles.cartAdd} aria-label="Add to Cart">
                            <Image src="/cart.png" alt="Cart" width={16} height={16}></Image>
                        </IconButton>
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
    price: PropTypes.string.isRequired,
    pred_price: PropTypes.string.isRequired,
    items: PropTypes.string.isRequired,
};

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default ProductCard;
