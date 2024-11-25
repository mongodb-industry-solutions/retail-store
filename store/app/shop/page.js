"use client"

import { useSelector, useDispatch } from 'react-redux';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductCard from "../_components/productCard/ProductCard";
import ProductList from "../_components/productList/ProductList";
import Sidebar from "../_components/sideBar/SideBar";

import React, { useState, useEffect } from 'react';
//import SideBar from "../_components/sideBar/SideBar";
import styles from "./shop.module.css";
import { setFilters } from '../../redux/slices/ProductsSlice';


export default function Page() {
  const dispatch = useDispatch();

  // const [filters, setFilters] = useState({});

  const handleFilterChange = (event) => {
    dispatch(setFilters(event))
  };  

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.pageContainer}>
        <div className={styles.sideBar}>
          <Sidebar onFilterChange={handleFilterChange}></Sidebar>
        </div>
        <div className={styles.productList}>
          <ProductList/>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}










