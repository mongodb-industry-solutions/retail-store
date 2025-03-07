"use client";

import { useState, useEffect } from "react";
import styles from "./productCard.module.css";
import PropTypes from "prop-types";
import PredPrice from "../predPrice/PredPrice";

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

import Image from "next/image";
import Badge from "@leafygreen-ui/badge";
import Icon from "@leafygreen-ui/icon";

const ProductCard = (props) => {
  const {
    id,
    photo,
    name,
    brand,
    price,
    pred_price,
    items,
    score
  } = props;
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  /* Choose quatity of item */
  const [quantity, setQuantity] = useState(1);
  const [maxStockAmount, setMaxStockAmount] = useState(0);

  const handleIncrease = () => {
    if (quantity < maxStockAmount) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedOption(null); // Reset selected option to null when modal is closed
    setQuantity(1); // Reset quantity to 1 when modal is closed
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent modal from closing when clicking inside the modal
  };

  const handleRadioChange = (value, item) => {
    setSelectedOption(value);
    setMaxStockAmount(item.stock[1].amount);
    setQuantity(1); // Reset quantity when size is changed
  };

  const isAddToCartDisabled = !selectedOption; // Disable "Add to Cart" button if no radio button is selected

  return (
      <LeafyGreenProvider>
        <Card className={styles.card}
          onClick={() => setOpen((o) => !o)}>
          <div className={styles.scoreContainer}>
            {
              score &&
              <Badge className={styles.scorebadge} variant="yellow">
                <Icon glyph="Favorite" />
                {score.toFixed(5)}
              </Badge>
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
            {brand === "MongoDB" && (
              <PredPrice productId={id} initialPredPrice={pred_price} />
            )}
            <div className={styles.subtitle}>
              <Subtitle>${price}</Subtitle>
              <IconButton className={styles.cartAdd} aria-label="Add to Cart">
              <Image src="/cart.png" alt="Cart" width={16} height={16}></Image>
            </IconButton>
            </div>

            <div>
              <Modal
                className={styles.modal}
                open={open}
                setOpen={setOpen}
                onClose={handleCloseModal}
                onClick={handleModalClick}
              >
                <div className={styles.detailModal} onClick={handleModalClick}>
                  <div className={styles.detailPhoto}>
                    <img src={photo} alt={name} width={400} height={400}></img>
                  </div>

                  <div className={styles.detailInfo}>
                    <Label className={styles.productName}>{name}</Label>
                    <Description className="mb-1">{brand}</Description>
                    <Subtitle className={styles.price}>${price}</Subtitle>
                    {/*
                
                <Description>Select a Size:</Description>
                    <RadioGroup
                      name="name-of-input-group"
                      size="xsmall"
                      value={selectedOption}
                      onChange={handleRadioChange}
                    >
                      {items &&
                        items.map((item, index) => (
                          <Radio
                            key={index}
                            value={`option-${index + 1}`}
                            onClick={() =>
                              handleRadioChange(`option-${index + 1}`, item)
                            }
                            //style={selectedOption === `option-${index + 1}` ? { color: 'blue' } : {}}
                          >
                            {item.name} - Stock: {item.stock[1].amount}
                          </Radio>
                        ))}
                    </RadioGroup>

                    */}
                    <div className={styles.quantitySection}>
                      <Description>Quantity:</Description>
                      <button
                        className={styles.quantityPicker}
                        onClick={handleDecrease}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{quantity}</span>
                      <button
                        className={styles.quantityPicker}
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>

                    <Button
                      className={styles.detailCart}
                      disabled={isAddToCartDisabled}
                    >
                      <img
                        src="/cart.png"
                        alt="Add Cart"
                        width={18}
                        height={18}
                      />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Modal>
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
