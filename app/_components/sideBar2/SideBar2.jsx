'use client'

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styles from './sideBar2.module.css';

import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import Checkbox from "@leafygreen-ui/checkbox";

function Sidebar2({ filters, onFilterChange }) {

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [facets, setFacets] = useState([]);

    useEffect(() => {
        const fetchFacets = async () => {
            try {
                const response = await axios.get('/api/getFacets');
                setFacets(response.data.facets);

            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchFacets();
    }, []);

    const handleBrandChange = (event) => {
        const item = event;
        let updatedSelectedBrands = selectedBrands;

        if (selectedBrands.includes(item)) {
            updatedSelectedBrands = selectedBrands.filter((g) => g !== item);
        } else {
            updatedSelectedBrands = [...selectedBrands, item];
        }
        setSelectedBrands(updatedSelectedBrands);
        onFilterChange({ ...filters, selectedBrands: updatedSelectedBrands });
    };


    return (
        <div className={styles.filterContainer}>

            <Subtitle>Filters</Subtitle>

            <>
                <div className={styles.brand}>
                    <Body className={styles.filterTitle}>Brand</Body>

                    {/* Log the list of brands */}
                    {/*console.log(facets?.[0]?.facet?.brand?.buckets)*/}

                    <div className={styles.checkboxList}>
                        {facets?.[0]?.facet?.brand?.buckets?.map((bucket) => (
                            <Checkbox
                                key={bucket._id}
                                label={`${bucket._id} (${bucket.count})`}
                                checked={selectedBrands.includes(bucket._id)}
                                onChange={() => handleBrandChange(bucket._id)}
                                className={styles.checkbox}
                            />
                        ))}
                    </div>
                </div>

                <hr className={styles.hr}></hr>

                <div className={styles.brand}>
                    <Body className={styles.filterTitle}>Type of Product</Body>
                </div>

                <hr className={styles.hr}></hr>

                <div className={styles.brand}>
                    <Body className={styles.filterTitle}>Color</Body>
                </div>


            </>

        </div>

    );
}

export default Sidebar2;