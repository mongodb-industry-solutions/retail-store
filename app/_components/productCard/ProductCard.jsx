"use client";

import { useDispatch } from 'react-redux';
import styles from "./productCard.module.css";
import PropTypes from "prop-types";

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import {
  Subtitle,
  Label,
  Description,
} from "@leafygreen-ui/typography";
import IconButton from "@leafygreen-ui/icon-button";

import Image from "next/image";
import { setOpenedProductDetails } from "@/redux/slices/ProductsSlice";

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
    <div className={styles.productContainer}>
      <LeafyGreenProvider>
        <Card className={styles.card} onClick={() => onProductClick()}>
          <div className={styles.productInfo}>
            <img src={photo} alt={name} width={200} height={200}></img>
            <Label className={styles.productName}>{name}</Label>
            <Description>{brand}</Description>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.subtitle}>
              <Subtitle>${price}</Subtitle>
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

export default ProductCard;
