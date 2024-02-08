"use client";

import styles from "./featured.module.css";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import ProductCard from "../productCard/ProductCard";


const Featured = () => {

    return (

        <div className={styles.content}>

            <H3 className={styles.h1}>Featured Items</H3>
            
          
            <ProductCard
          photo="/socks.png"
          name="Leafy Socks"
          brand="MongoDB"
          elasticity="-1200"
          price="35"
        />
    
        </div>



    );
};


export default Featured;
