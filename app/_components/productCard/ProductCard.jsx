"use client";

import { useState } from "react";
import styles from "./productCard.module.css";
import PropTypes from "prop-types";

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Card from "@leafygreen-ui/card";
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  InlineKeyCode,
  Overline,
  Label,
  Description,
} from "@leafygreen-ui/typography";
import Modal from "@leafygreen-ui/modal";
import Button from "@leafygreen-ui/button";
import IconButton from "@leafygreen-ui/icon-button";
import { RadioGroup, Radio } from "@leafygreen-ui/radio-group";

import Image from "next/image";

const ProductCard = ({ id, photo, name, brand, price, pred_price, items }) => {
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
    <div className={styles.productContainer}>
      <LeafyGreenProvider>
        <Card className={styles.card} onClick={() => setOpen((o) => !o)}>
          <div className={styles.productInfo}>
            <img src={photo} alt={name} width={200} height={200}></img>
            <Label className={styles.productName}>{name}</Label>
            <Description>{brand}</Description>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.subtitle}>
              <Subtitle>${price}</Subtitle>
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
                    <Description>{brand}</Description>
                    

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
