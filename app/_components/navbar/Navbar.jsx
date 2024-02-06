

import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import Cart from "../cart/Cart";
import Profile from "../profile/Profile"
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/leafyLogo.png"
            alt="MongoDB logo"
            width={100}
            height={20}
          ></Image>
        </Link>
      </div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

<SearchBar></SearchBar>
      <div className={styles.iconButtons}>
        <Profile></Profile>
        <Cart></Cart>
    
      </div>
    </nav>
  );
};

export default Navbar;
