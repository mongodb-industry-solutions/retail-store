"use client";

import styles from "./sideBar.module.css";

import { useState } from "react";


import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import Checkbox from "@leafygreen-ui/checkbox";


const SideBar = () => {

    const [checked, setChecked] = useState(false);

    return (
        <div className={styles.filterContainer}>

            <Subtitle className={styles.tagline}>Filter by</Subtitle>

            <div className={styles.brand}>

                <Body className={styles.filterTitle}>Brand</Body>

            </div>

            <hr className={styles.hr}></hr>

            <div className={styles.size}>

                <Body className={styles.filterTitle}>Size</Body>
                <Checkbox
                    label="S"
                    checked={checked}
                    onChange={() => setChecked((curr) => !curr)}
                />
              
            </div>

            <hr className={styles.hr}></hr>

            <div className={styles.color}>

                <Body className={styles.filterTitle}>Color</Body>
            </div>

            <hr className={styles.hr}></hr>

            <div className={styles.price}>

                <Body className={styles.filterTitle}>Price</Body>
            </div>



        </div>
    );
};


export default SideBar;
