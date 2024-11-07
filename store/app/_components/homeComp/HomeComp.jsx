
"use client"

import Banner from "../banner/Banner";
import Featured from "../featured/Featured";
import styles from "./homeComp.module.css";
import React, { useState } from 'react';



const HomeComp = () => {


  return (
    <div>
      <Banner />
      <Featured/>
    </div>
  );
};


export default HomeComp;
