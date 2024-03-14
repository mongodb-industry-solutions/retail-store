'use client'

import React, { useState, useContext, useEffect } from 'react';

import styles from './sideBar2.module.css';

import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
import Checkbox from "@leafygreen-ui/checkbox";

function Sidebar2({ facets, filterProducts, filterOrders, filterSales, page }) {

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [numColorsToShow, setNumColorsToShow] = useState(10);


    const handleItemChange = (event) => {
        const item = event;
        let updatedSelectedItems = selectedItems;

        if (selectedItems.includes(item)) {
            updatedSelectedItems = selectedItems.filter((g) => g !== item);
        } else {
            updatedSelectedItems = [...selectedItems, item];
        }
        setSelectedItems(updatedSelectedItems);

        // Sort the selected sizes according to the desired order
        const sortedItems = updatedSelectedItems.sort((a, b) => {
            const itemOrder = ['XS', 'S', 'M', 'L', 'XL'];
            return itemOrder.indexOf(a) - itemOrder.indexOf(b);
        });

        if (page === 'products') {
            filterProducts(sortedItems, selectedProducts);
        } else if (page === 'orders') {
            filterOrders(sortedItems, selectedProducts);
        } else if (page === 'sales') {
            filterSales(sortedItems, selectedProducts); {/* Call filterSales for sales page */ }
        }
    };

    const handleProductChange = (event) => {
        const color = event;
        let updatedSelectedProducts = selectedProducts;

        if (selectedProducts.includes(color)) {
            updatedSelectedProducts = selectedProducts.filter((y) => y !== color);
            setSelectedProducts(updatedSelectedProducts);
        } else {
            updatedSelectedProducts = [...selectedProducts, color];
            setSelectedProducts(updatedSelectedProducts);
        }
        if (page === 'products') {
            filterProducts(selectedItems, updatedSelectedProducts);
        } else if (page === 'orders') {
            filterOrders(selectedItems, updatedSelectedProducts);
        } else if (page === 'sales') {
            filterSales(selectedItems, updatedSelectedProducts); {/* Call filterSales for sales page */ }
        }
    };


    const handleExpand = () => {
        setNumColorsToShow(numColorsToShow + 10);
    };

    const handleCollapse = () => {
        setNumColorsToShow(10);
    };

    useEffect(() => {
        const fetchFacets = async () => {
          try {
            const response = await axios.get('/api/getFacets'); 
            
            console.log(response.json());

          } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
          }
        };
    
        fetchFacets();
      }, []);

    return (
        <div className={styles.filterContainer}>

            <Subtitle>Filters</Subtitle>

            <>

                <div className={styles.brand}>
                    <Body className={styles.filterTitle}>Brand</Body>

                    {/* Log the list of brands */}
                    {console.log(facets?.[0]?.facet?.brand?.buckets)}

                    {console.log(facets)}

                    {facets?.[0]?.facet?.brand?.buckets?.map((bucket) => (
                        <label key={bucket._id}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(bucket._id)}
                                onChange={() => handleItemChange(bucket._id)}
                            />
                            <span>{bucket._id} ({bucket.count})</span>
                        </label>
                    ))}
                </div>


                <hr className={styles.hr}></hr>

                <div className={styles.size} >

                    <Body className={styles.filterTitle}>Size</Body>

                    {facets?.[0]?.facet?.itemsFacet.buckets
                        .sort((a, b) => {
                            const itemOrder = ['XS', 'S', 'M', 'L', 'XL'];
                            return itemOrder.indexOf(a._id) - itemOrder.indexOf(b._id);
                        })
                        .map((bucket) => (
                            <label key={bucket._id}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(bucket._id)}
                                    onChange={() => handleItemChange(bucket._id)}
                                />
                                <span>{bucket._id} ({bucket.count})</span>
                            </label>

                        ))}
                </div>

                <hr className={styles.hr}></hr>

                <div className={styles.color} >

                <Body className={styles.filterTitle}>Color</Body>

                    <div className={styles["color-list"]}>
                        {facets?.[0]?.facet?.productsFacet.buckets.slice(0, numColorsToShow).map((bucket) => (
                            <label key={bucket._id}>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(bucket._id)}
                                    onChange={() => handleProductChange(bucket._id)}
                                />
                                <span>{bucket._id} ({bucket.count})</span>
                            </label>
                        ))}
                        {numColorsToShow < facets?.[0]?.facet?.productsFacet.buckets.length && (
                            <button onClick={handleExpand}>Show More</button>
                        )}

                        {numColorsToShow >= facets?.[0]?.facet?.productsFacet.buckets.length && facets[0].facet.productsFacet.buckets.length > 10 && (
                            <button onClick={handleCollapse}>Show Less</button>
                        )}
                    </div>
                </div>
            </>

        </div>

    );
}

export default Sidebar2;