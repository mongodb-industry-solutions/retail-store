"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import PredPrice from "../predPrice/PredPrice";

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("/api/getProducts", filters);
        const transformedProducts = response.data.products.map((product) => ({
          id: product.id,
          photo: product.image.url,
          name: product.name,
          brand: product.brand,
          price: `${product.price.amount.toFixed(2)}`,
          pred_price: `${product.pred_price.toFixed(2)}`,
          items: product.items,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div className={styles.productContainer}>
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard
            id={product.id}
            photo={product.photo}
            name={product.name}
            brand={product.brand}
            price={product.price}
            items={product.items}
          />
        </div>
      ))}
    </div>
  );
};
export default ProductList;
