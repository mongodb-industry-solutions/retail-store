import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./predPrice.module.css"

const PredPrice = ({ productId, initialPredPrice }) => {
  const [predPrice, setPredPrice] = useState(initialPredPrice);

  useEffect(() => {
    const fetchUpdatedPredPrice = async () => {
      try {
        const response = await axios.post("/api/getPredPrice", { productId });
        setPredPrice(response.data.pred_price.toFixed(2));
      } catch (error) {
        console.error("Failed to fetch updated predicted price:", error);
      }
    };

    const intervalId = setInterval(fetchUpdatedPredPrice, 3000);

    return () => clearInterval(intervalId);
  }, [productId]); 

  return <div className={style.predPrice}>Predicted Price: ${predPrice}</div>;
};

export default PredPrice;
