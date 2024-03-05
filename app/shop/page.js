import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductCard from "../_components/productCard/ProductCard";
import ProductList from "../_components/productList/ProductList";
import styles from "./shop.module.css";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>

      <ProductList></ProductList>

      <Footer></Footer>
    </>
  );
}
