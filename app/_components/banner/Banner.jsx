"use client";

import styles from "./banner.module.css";
import "../../fonts.css";
import Image from "next/image";

import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import Button from "@leafygreen-ui/button";




const Banner = () => {

    return (
        <div className={styles.bannerContainer}>

            <div className={styles.bannerText}>

                <div className={styles.bannerTag}>
                    <InlineKeyCode className={styles.tag}>SALE</InlineKeyCode >

                    <Body className={styles.tagline}>Up to 15% off, only this week!</Body>
                </div>

                <H1 className={styles.title}>Welcome to the Pop-Up Store!</H1>

                <Body className={styles.body}> 
                    Feel free to explore the website, add items to your cart, and navigate through the various pages
                    and enjoy exploring the capabilities of MongoDB!
                </Body>

                <Button  href="/shop" className={styles.shopButton}>
                    Shop Now
                </Button>
            </div>

            <div className={styles.imgContainer}>
                <Image 
                    src="/placeholder.png" 
                    alt="Cart" 
                    // width={550} 
                    // height={auto}
                    layout="responsive"
                    width={80} // Arbitrary width for setting aspect ratio
                    height={40} // Arbitrary height to set the aspect ratio
                />
            </div>
        </div>
    );
};


export default Banner;
