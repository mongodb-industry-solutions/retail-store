import Image from "next/image";
import styles from "./page.module.css";
import "./fonts.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import HomeComp from "./_components/homeComp/HomeComp";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HomeComp></HomeComp>
      <Footer></Footer>
    </>
  );
}
