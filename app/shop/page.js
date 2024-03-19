"use client"

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductCard from "../_components/productCard/ProductCard";
import ProductList from "../_components/productList/ProductList";
import Sidebar from "../_components/sideBar/SideBar";

import React, { useState } from 'react';
//import SideBar from "../_components/sideBar/SideBar";
import styles from "./shop.module.css";


export default function Page() {

  const [filters, setFilters] = useState([]);

  const handleFilterChange = (event) => {
    setFilters(event);
  };

  return (
    <>
      <Navbar></Navbar>

      <div className={styles.pageContainer}>

        <div className={styles.sideBar}>
          <Sidebar filters={filters} onFilterChange={handleFilterChange}></Sidebar>
        </div>
        <div className={styles.productList}>
          <ProductList filters={filters}/>
         
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}










