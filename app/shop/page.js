
import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import ProductCard from "../_components/productCard/ProductCard";
import ProductList from "../_components/productList/ProductList";
import Sidebar2 from "../_components/sideBar2/SideBar2";
//import SideBar from "../_components/sideBar/SideBar";
import styles from "./shop.module.css";


export default function Page() {
  return (
    <>
      <Navbar></Navbar>

      <div className={styles.pageContainer}>

        <div className={styles.sideBar}>
          <Sidebar2></Sidebar2>
        </div>
        <div className={styles.productList}>
          <ProductList />
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}










