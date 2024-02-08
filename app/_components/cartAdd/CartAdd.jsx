"use client";

import { useState } from "react";
import styles from "./cartAdd.module.css";
import Image from "next/image";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";

const cartAdd = () => {

  return (
    <div className={styles.cartContainer}>

      <LeafyGreenProvider>
        <IconButton className={styles.cartIcon}>
          <Image src="/cart.png" alt="Cart" width={16} height={16}></Image>
        </IconButton>
      </LeafyGreenProvider>

    </div>
  );
};

//<button onClick={addItemToCart}>Add Item to Cart</button>*/

export default cartAdd;
