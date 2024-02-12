import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductCard from "../_components/productCard/ProductCard";
import styles from "./shop.module.css";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>

      <div className={styles.products}>
        <ProductCard
          photo="/socks.png"
          name="Leafy Socks"
          brand="MongoDB"
          elasticity="-1200"
          price="35"
        />
      </div>

      <Footer></Footer>
    </>
  );
}
