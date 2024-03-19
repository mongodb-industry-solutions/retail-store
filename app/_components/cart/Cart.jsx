"use client";

import { useState } from "react";
import styles from "./cart.module.css";
import Image from "next/image";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";
import Button from "@leafygreen-ui/button";
import Modal from "@leafygreen-ui/modal";
import Banner from "@leafygreen-ui/banner";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Link } from '@leafygreen-ui/typography';
import TextInput from "@leafygreen-ui/text-input";


const Cart = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false); // New state variable


  const addItemToCart = () => {
    const newItem = {
      id: 1,
      name: "Test",
      price: 1,
    };

    //setCartItems([...cartItems, newItem]);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handlePlaceOrder = () => {
    setThankYouModalOpen(true); // Open the thank you modal
    setOpen(false); // Close the checkout modal
  };

  return (
    <div className={styles.cartContainer}>

      <LeafyGreenProvider onClick={toggleCart}>
        <IconButton className={styles.cartIcon} onClick={toggleCart} aria-label="Toggle Cart">
          <Image src="/cart.png" alt="Cart" width={16} height={16}></Image>
        </IconButton>
      </LeafyGreenProvider>

      {isCartOpen && (
        <div className={styles.cartPopup}>
          {cartItems.length > 0 ? (
            <div>
              <h3>Your Cart</h3>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <span>{item.name} </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>Your cart is empty</p>

              <Button onClick={() => setOpen((o) => !o)}>Checkout</Button>
              <Modal open={open} setOpen={setOpen}>

                <H1>Checkout</H1>
                <Banner>
                  Disclaimer: This is a simulated ecommerce store, we will not be gathering your email.
                </Banner>

                <TextInput
                  className={styles.emailInput}
                  label="Email"
                  placeholder="hello@mongodb.com"
                />
                <Button onClick={handlePlaceOrder} className={styles.orderButton}>
                  Place Order
                </Button>

              </Modal>
            </div>

          )}

          {/* Thank you modal */}
          <Modal open={thankYouModalOpen} setOpen={setThankYouModalOpen}>
            <div className="thankYouModalContent">
              <Image src="/thankyou.png" alt="Cart" width={400} height={300}></Image>
              <H3 className={styles.h3}>Thank you for your order!</H3>
              <Body className={styles.body}>Order Number: XXXXX</Body>
            </div>
          </Modal>

        </div>
      )}
    </div>
  );
};

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default Cart;
