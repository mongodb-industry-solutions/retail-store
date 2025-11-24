"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "../productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import styles from "./productList.module.css";
import Pagination from "@leafygreen-ui/pagination";
import ProductListLoading from "./ProductListLoading";
import { setCurrentPage, setInitialLoad, setLoading, setProducts, updateProductPrice } from "../../../redux/slices/ProductsSlice";
import { getProductsWithSearch, getProductsWithVectorSearch } from "../../_lib/api";
import { PAGINATION_PER_PAGE, SEARCH_TYPES } from "../../_lib/constants";

const itemsPerPage = PAGINATION_PER_PAGE;

const ProductList = () => {
  const dispatch = useDispatch();
  const sessionId = useRef(uuidv4());
  const products = useSelector(state => state.Products.products)
  const totalItems = useSelector(state => state.Products.totalItems)
  const currentPage = useSelector(state => state.Products.pagination_page)
  const searchIsLoading = useSelector(state => state.Products.searchIsLoading)
  const initialLoad = useSelector(state => state.Products.initialLoad)
  const filters = useSelector(state => state.Products.filters)
  const query = useSelector(state => state.Products.query)
  const searchType = useSelector(state => state.Products.searchType)
  const [sseConnection, setSSEConnection] = useState(null);

  const listenToSSEUpdates = useCallback(() => {
    console.log('listenToSSEUpdates func')
    const collection = "products";
    const eventSource = new EventSource(`/api/sse?sessionId=${sessionId.current}&colName=${collection}`)

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
        dispatch(updateProductPrice({objectId, newPredPrice}))
        // setFilteredProducts((prevData) => {
        //   prevData[objectId] =  {...prevData[objectId], pred_price: newPredPrice}
        //   return {...prevData}
        // });
      }
    }

    eventSource.onerror = (event) => {
      console.error('SSE Error:', event);
    }
    setSSEConnection(eventSource);
    return eventSource;
  }, []);

  const getProducts = async () => {
    console.log('- FILTERS CHANGED', filters)
    try {
      dispatch(setLoading(true))
      let response;
      dispatch(setLoading(true))
      if(searchType === SEARCH_TYPES.atlasSearch)
          response = await getProductsWithSearch(query, filters)
      if(response){
          console.log('getAllProducts result', Object.keys(response).length)
          dispatch(
            setProducts({
                products: response.products, 
                totalItems: response.totalItems
            }
          ))        
        }
    } catch (err) {
        console.log(`Error getting all products, ${err}`)
    }
  }

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

  useEffect(() => {
    if(initialLoad === true )
      getProducts()
  }, [filters]);
  
  useEffect(() => {
    getProducts()
  }, [currentPage])

  useEffect(() => {
      console.log("useEffect: listenToSSEUpdates ")
      sseConnection?.current?.close();
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
                  score={product.searchScore}
                />
              </div>
            ))
        }
      </div>
      <br></br>
      <hr className={styles.hr}></hr>
      <Pagination
        currentPage={currentPage + 1}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={[8, 16, itemsPerPage]}
        numTotalItems={totalItems}
        onForwardArrowClick={ () => dispatch(setCurrentPage(currentPage + 1)) }
        onBackArrowClick={ () => dispatch(setCurrentPage(currentPage - 1)) }
      ></Pagination>
    </div>
  );
};
export default ProductList;
