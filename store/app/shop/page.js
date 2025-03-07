"use client"

import { useDispatch } from 'react-redux';

import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductList from "../_components/productList/ProductList";
import Sidebar from "../_components/sideBar/SideBar";

import React from 'react';
import styles from "./shop.module.css";
import { setFilters } from '../../redux/slices/ProductsSlice';
import TalkTrackContainer from '../_components/talkTrackContainer/talkTrackContainer';
import { shopPage } from '../_lib/talkTrack';


export default function Page() {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilters(event))
  };  

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.pageContainer}>
        <div className={styles.sideBar}>
          <TalkTrackContainer sections={shopPage} />
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










