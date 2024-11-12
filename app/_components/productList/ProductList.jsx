"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import Pagination from "@leafygreen-ui/pagination";

const itemsPerPage = 20;

const ProductList = ({ filters }) => {
  const [sseConnection, setSSEConnection] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState({});
  const [paginationLength, setPaginationLength] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(itemsPerPage - 1);

  const listenToSSEUpdates = useCallback(() => {
    console.log('listenToSSEUpdates func')
    const eventSource = new EventSource('/api/sse')

    eventSource.onopen = () => {
      console.log('SSE connection opened.')
      // Save the SSE connection reference in the state
    }

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received SSE Update:', data);
      // validate if the change was on the pred_price field
      if(data.updateDescription.updatedFields['pred_price']){
        const objectId = data.documentKey._id
        const newPredPrice = data.updateDescription.updatedFields.pred_price
        console.log(`the pred price changed to ${newPredPrice} for product with id ${objectId}`)
        setFilteredProducts((prevData) => {
          prevData[objectId] =  {...prevData[objectId], pred_price: newPredPrice}
          return {...prevData}
        });
      }
    }

    eventSource.onerror = (event) => {
      console.error('SSE Error:', event);
    }
    setSSEConnection(eventSource);
    return eventSource;
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("/api/getProducts", filters);
        let transformedProducts = {}
        console.log("/api/getProducts", response.data.products)
        response.data.products.map((product) => (
            transformedProducts[product._id] = {
              _id: product._id,
              id: product.id,
              photo: product.image.url,
              name: product.name,
              brand: product.brand,
              price: `${product.price.amount.toFixed(2)}`,
              pred_price: `${product.pred_price.toFixed(2)}`,
              items: product.items,
            }
        ));
        setFilteredProducts(transformedProducts);
        setPaginationLength(Object.keys(transformedProducts).length)
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

  useEffect(() => {
      const eventSource = listenToSSEUpdates();

      return () => {
          if (eventSource) {
              eventSource.close();
              console.log('SSE connection closed.');
          }
      }
  }, [listenToSSEUpdates]);

  return (
    <div>
      <div className={styles.productContainer}>
        {Object.values(filteredProducts)
          .slice(firstIndex, lastIndex)
          .map((product, index) => (
            <div key={index}>
              <ProductCard
                id={product.id}
                photo={product.photo}
                name={product.name}
                brand={product.brand}
                price={product.price}
                pred_price={product.pred_price}
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
        itemsPerPageOptions={[8, 16, itemsPerPage]}
        numTotalItems={paginationLength}
        onForwardArrowClick={ () => setCurrentPage(currentPage + 1) }
        onBackArrowClick={ () => setCurrentPage(currentPage - 1) }
      ></Pagination>
    </div>
  );
};
export default ProductList;
