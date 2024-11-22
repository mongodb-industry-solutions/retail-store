"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import Pagination from "@leafygreen-ui/pagination";
import ProductListLoading from "./ProductListLoading";
import { setInitialLoad, setLoading, setProducts } from "../../../redux/slices/ProductsSlice";
import { getProductsWithSearch } from "../../_lib/api";

const itemsPerPage = 20;

const ProductList = ({ filters }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.Products.products)
  const searchIsLoading = useSelector(state => state.Products.searchIsLoading)
  const initialLoad = useSelector(state => state.Products.initialLoad)
  const [sseConnection, setSSEConnection] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState({});
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
    const getAllProducts = async () => {
      try {
        dispatch(setLoading(true))
        let result = await getProductsWithSearch();
        if(result){
            console.log('getAllProducts result', Object.keys(result).length)
            dispatch(setInitialLoad(true))
            dispatch(setProducts(result))
        }
      } catch (err) {
          console.log(`Error getting all products, ${err}`)
      }
    }

    if(initialLoad === false){
      getAllProducts()
    }
  }, [initialLoad]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.post("/api/getProducts", filters);
  //       let transformedProducts = {};
  //       console.log("/api/getProducts", response.data.products);
  //       response.data.products.map(
  //         (product) =>
  //           (transformedProducts[product._id] = {
  //             ...product,
  //             _id: product._id,
  //             id: product.id,
  //             photo: product.image.url,
  //             name: product.name,
  //             brand: product.brand,
  //             price: `${product.price.amount.toFixed(2)}`,
  //             pred_price: `${product.pred_price.toFixed(2)}`,
  //             items: product.items,
  //           })
  //       );
  //       setFilteredProducts(transformedProducts);
  //       setPaginationLength(Object.keys(transformedProducts).length);
  //     } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [filters]);

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
        {
          searchIsLoading || !initialLoad
          ? <ProductListLoading/>
          : Object.values(products)
            .slice(firstIndex, lastIndex)
            .map((product, index) => (
              <div key={index} onClick={() => console.log(product)}>
                <ProductCard
                  id={product.id}
                  photo={product.photo}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  pred_price={product.pred_price}
                  items={product.items}
                  score={product.score}
                />
              </div>
            ))
        }
      </div>
      <br></br>
      <hr className={styles.hr}></hr>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[8, 16, itemsPerPage]}
        numTotalItems={Object.keys(products).length}//paginationLength}
        onForwardArrowClick={ () => setCurrentPage(currentPage + 1) }
        onBackArrowClick={ () => setCurrentPage(currentPage - 1) }
      ></Pagination>
    </div>
  );
};
export default ProductList;
