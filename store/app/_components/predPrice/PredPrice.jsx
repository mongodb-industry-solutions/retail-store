import React, { useState, useEffect } from "react";
import style from "./predPrice.module.css";

const PredPrice = ({ productId, initialPredPrice }) => {
  const [predPrice, setPredPrice] = useState(initialPredPrice);
  const [arrowDirection, setArrowDirection] = useState("");

  useEffect(() => {
    setArrowDirection(
      predPrice > initialPredPrice
        ? "/arrow_down.png"
        : predPrice < initialPredPrice
        ? "/arrow_up.png"
        : ""
    );
    setPredPrice(initialPredPrice);
  }, [initialPredPrice]);

  return (
    <div className={style.predPrice}>
      Predicted Price: ${Number(initialPredPrice)?.toFixed(2)}{" "}
      {arrowDirection && (
        <img className={style.arrowImg} src={arrowDirection} alt="Arrow" />
      )}
    </div>
  );
};

export default PredPrice;
