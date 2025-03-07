"use client";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import styles from "./productCard.module.css";
import PropTypes from "prop-types";

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import {
  Label,
  Description,
  Subtitle
} from "@leafygreen-ui/typography";
import Modal from "@leafygreen-ui/modal";
import Button from "@leafygreen-ui/button";
import IconButton from "@leafygreen-ui/icon-button";
import { setOpenedProductDetails } from "@/redux/slices/ProductsSlice";
import Image from "next/image";
import Badge from "@leafygreen-ui/badge";
import Icon from "@leafygreen-ui/icon";

const ProductCard = ({ id, photo, name, brand, price, pred_price, items }) => {
  const dispatch = useDispatch();


  const onProductClick = () => {
    dispatch(setOpenedProductDetails({
      id,
      photo,
      name,
      brand,
      price,
      pred_price,
      items,
    }))
  }

  return (
      <LeafyGreenProvider>
        <Card className={styles.card} onClick={() => onProductClick()}>
          <div className={styles.scoreContainer}>
            {
              // score &&
              // <Badge className={styles.scorebadge} variant="yellow">
              //   <Icon glyph="Favorite" />
              //   {score.toFixed(5)}
              // </Badge>
            }
          </div>
          <div className={styles.productInfo}>
            <Image
              src={photo}
              alt={name}
              width={200}
              height={200}
              quality={50}
              unoptimized
            />
            <Label className={styles.productName}>{name}</Label>
            <Description>{brand}</Description>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.subtitle}>
              <Subtitle>${price}</Subtitle>
              <IconButton className={styles.cartAdd} aria-label="Add to Cart">
              <Image src="/cart.png" alt="Cart" width={16} height={16}></Image>
            </IconButton>
            </div>
          </div>
        </Card>
      </LeafyGreenProvider>
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

export default ProductCard;
