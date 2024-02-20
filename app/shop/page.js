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
          photo="/duck.jpg"
          name="Leafy Rubber Duck"
          brand="MongoDB"
          elasticity="-1200"
          price="35"
        />

        <ProductCard
          photo="/lego.jpg"
          name="University Lego"
          brand="MongoDB"
          elasticity="-1600"
          price="49"
        />

        <ProductCard
          photo="/tshirt.jpg"
          name="Black Tshirt"
          brand="MongoDB"
          elasticity="-1600"
          price="25"
        />

      </div>

      <Footer></Footer>
    </>
  );
}
