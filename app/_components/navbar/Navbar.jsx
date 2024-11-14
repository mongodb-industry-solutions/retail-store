'use client'
import { usePathname } from 'next/navigation';

import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import Cart from "../cart/Cart";
import Profile from "../profile/Profile"
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/leafyLogo.png"
            alt="MongoDB logo"
            width={150}
            height={40}
          ></Image>
        </Link>
      </div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      { pathname === '/shop' && <SearchBar/> }

      <div className={styles.iconButtons}>
        <Profile></Profile>
        <Cart></Cart>

      </div>
    </nav>
  );
};

export default Navbar;
