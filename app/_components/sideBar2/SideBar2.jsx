'use client'

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styles from './sideBar2.module.css';

import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import Checkbox from "@leafygreen-ui/checkbox";

function Sidebar2({ filters, onFilterChange }) {

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [numColorsToShow, setNumColorsToShow] = useState(10);
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
        console.log(updatedSelectedBrands);
        setSelectedBrands(updatedSelectedBrands);
        onFilterChange({...filters, selectedBrands: updatedSelectedBrands});

        // Sort the selected sizes according to the desired order
        /*const sortedItems = updatedSelectedBrands.sort((a, b) => {
            const itemOrder = ['XS', 'S', 'M', 'L', 'XL'];
            return itemOrder.indexOf(a) - itemOrder.indexOf(b);
        });*/

        /*if (page === 'products') {
            filterProducts(sortedItems, selectedProducts);
        } else if (page === 'orders') {
            filterOrders(sortedItems, selectedProducts);
        } else if (page === 'sales') {
            filterSales(sortedItems, selectedProducts); {}
        }*/
    };



    const handleExpand = () => {
        setNumColorsToShow(numColorsToShow + 10);
    };

    const handleCollapse = () => {
        setNumColorsToShow(10);
    };

    return (
        <div className={styles.filterContainer}>

            <Subtitle>Filters</Subtitle>

            <>

                <div className={styles.brand}>
                    <Body className={styles.filterTitle}>Brand</Body>

                    {/* Log the list of brands */}
                    {/*console.log(facets?.[0]?.facet?.brand?.buckets)*/}

                    {facets?.[0]?.facet?.brand?.buckets?.map((bucket) => (
                        <label key={bucket._id}>
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(bucket._id)}
                                onChange={() => handleBrandChange(bucket._id)}
                            />
                            <span>{bucket._id} ({bucket.count})</span>
                        </label>
                    ))}
                </div>


                <hr className={styles.hr}></hr>

            </>

        </div>

    );
}

export default Sidebar2;