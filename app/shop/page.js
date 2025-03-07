"use client"

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductList from "../_components/productList/ProductList";
import Sidebar from "../_components/sideBar/SideBar";

import React, { useState } from 'react';
//import SideBar from "../_components/sideBar/SideBar";
import styles from "./shop.module.css";
import ProductDetailsModal from "../_components/productDetailsModal/ProductDetailsModal";


export default function Page() {

  const [filters, setFilters] = useState([]);

  const handleFilterChange = (event) => {
    setFilters(event);
  };

  return (
    <>
      <Navbar/>
        <div className={styles.pageContainer}>
          <div className={styles.sideBar}>
            <Sidebar filters={filters} onFilterChange={handleFilterChange}></Sidebar>
          </div>
          <div className={styles.productList}>
            <ProductList filters={filters}/>
          </div>
        </div>
        <ProductDetailsModal/>
      <Footer/>
    </>
  );
}










