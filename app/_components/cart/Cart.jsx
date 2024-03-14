"use client";

import { useState } from "react";
import styles from "./cart.module.css";
import Image from "next/image";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";

const Cart = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
            <p>Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default Cart;
