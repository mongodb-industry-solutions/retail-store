import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./predPrice.module.css";


const PredPrice = ({ productId, initialPredPrice }) => {
  const [predPrice, setPredPrice] = useState(initialPredPrice);
  const [prevPredPrice, setPrevPredPrice] = useState(initialPredPrice);

  useEffect(() => {
    // TODO
    // const fetchUpdatedPredPrice = async () => {
    //   try {
    //     const response = await axios.post("/api/getPredPrice", { productId });
    //     const newPredPrice = response.data.pred_price.toFixed(2);
    //     setPrevPredPrice(predPrice);
    //     setPredPrice(newPredPrice);
    //    // console.log(newPredPrice);
    //   } catch (error) {
    //     console.error("Failed to fetch updated predicted price:", error);
    //   }
    // };

    // const intervalId = setInterval(fetchUpdatedPredPrice, 3000);

    // return () => clearInterval(intervalId);
  }, [productId, predPrice]);

  const arrowDirection = predPrice > prevPredPrice ? '/arrow_down.png' : predPrice < prevPredPrice ? '/arrow_up.png' : null;

  return (

   

    <div className={style.predPrice}>
      Predicted Price: ${predPrice} {arrowDirection && <img className={style.arrowImg} src={arrowDirection} alt="Arrow" />}
    </div>
  );
};

export default PredPrice;
