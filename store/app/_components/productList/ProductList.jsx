"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import Pagination from "@leafygreen-ui/pagination";

const itemsPerPage = 20;

const ProductList = ({ filters }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(itemsPerPage - 1);

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
        setFilteredProducts(transformedProducts);
        setPaginationLength(transformedProducts.length)
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchProducts();
  }, [filters]);

  useEffect(() => {
    let firstIndex = (currentPage - 1) * itemsPerPage
    let lastIndex = firstIndex + itemsPerPage
    setFirstIndex(firstIndex)
    setLastIndex(lastIndex)
  }, [currentPage])

  return (
    <div>
      <div className={styles.productContainer}>
        {filteredProducts
          .slice(firstIndex, lastIndex)
          .map((product, index) => (
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
      <br></br>
      <hr className={styles.hr}></hr>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        //itemsPerPageOptions={[8, 16, 32]}
        numTotalItems={paginationLength}
        onForwardArrowClick={ () => setCurrentPage(currentPage + 1) }
        onBackArrowClick={ () => setCurrentPage(currentPage - 1) }
      ></Pagination>
    </div>
  );
};
export default ProductList;
