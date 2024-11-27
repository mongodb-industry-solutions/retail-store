"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import styles from "./productList.module.css";
import ProductCard from "../productCard/ProductCard";
import Pagination from "@leafygreen-ui/pagination";
import { setInitialLoad, setLoading, setProducts, updateProductPrice } from "../../../redux/slices/ProductsSlice";
import { getProductsWithSearch } from "@/lib/api";


const itemsPerPage = 40;

const ProductList = ({ filters }) => {
  const dispatch = useDispatch();
  const initialLoad = useSelector(state => state.Products.initialLoad)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(itemsPerPage - 1);

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
    const fetchProducts = async () => {
      try {
        const response = await axios.post("/api/getProducts", filters);
        const transformedProducts = response.data.products.map((product) => ({
          ...product,
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
                id={product._id}
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
        itemsPerPageOptions={[8, 16, itemsPerPage]}
        numTotalItems={paginationLength}
        onForwardArrowClick={ () => setCurrentPage(currentPage + 1) }
        onBackArrowClick={ () => setCurrentPage(currentPage - 1) }
      ></Pagination>
    </div>
  );
};
export default ProductList;
