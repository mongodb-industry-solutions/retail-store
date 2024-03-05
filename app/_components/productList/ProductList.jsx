"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/getProducts'); 
        const transformedProducts = response.data.products.map(product => ({
          photo: product.image.url, 
          name: product.name,
          brand: product.brand,
          price: `${product.price.amount.toFixed(2)}`
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productContainer}>
      {products.map((product, index) => (
        <ProductCard
          key={index} 
          photo={product.photo}
          name={product.name}
          brand={product.brand}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;