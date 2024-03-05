import React from 'react';
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";

// Assuming this is your array of product data
const products = [
  {
    photo: 'product1.jpg',
    name: 'Product 1',
    brand: 'Brand 1',
    price: '10.00'
  },
  {
    photo: 'product2.jpg',
    name: 'Product 2',
    brand: 'Brand 2',
    price: '20.00'
  },
  {
    photo: 'product1.jpg',
    name: 'Product 1',
    brand: 'Brand 1',
    price: '10.00'
  },
  {
    photo: 'product2.jpg',
    name: 'Product 2',
    brand: 'Brand 2',
    price: '20.00'
  },
  {
    photo: 'product1.jpg',
    name: 'Product 1',
    brand: 'Brand 1',
    price: '10.00'
  },
  {
    photo: 'product2.jpg',
    name: 'Product 2',
    brand: 'Brand 2',
    price: '20.00'
  },
  {
    photo: 'product1.jpg',
    name: 'Product 1',
    brand: 'Brand 1',
    price: '10.00'
  },
  {
    photo: 'product2.jpg',
    name: 'Product 2',
    brand: 'Brand 2',
    price: '20.00'
  },
  // Add more product objects as needed
];

const ProductList = () => {
  return (
    <div className={styles.productContainer}>
      {products.map((product, index) => (
        <ProductCard
          key={index} // Assuming index can be used as a unique key
          photo={product.photo}
          name={product.name}
          brand={product.brand}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
