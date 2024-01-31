"use client";

import styles from "./banner.module.css";
import "../../fonts.css";
import Image from "next/image";


const Banner = () => {

    return (
        <div className={styles.bannerContainer}>

            <div className={styles.bannerText}>

                <div className={styles.bannerTag}>
                    <p className={styles.tag}>SALE</p>

                    <p>Up to 15% off, only this week!</p>
                </div>

                <h1>Welcome to the Pop-Up Store!</h1>

                <p>
                    Feel free to explore the website, add items to your cart, and navigate through the various pages
                    and enjoy exploring the capabilities of MongoDB!
                </p>
            </div>

            <div className={styles.imgContainer}>
                <Image src="/placeholder.png" alt="Cart" width={600} height={600}></Image>
            </div>
        </div>
    );
};


export default Banner;
