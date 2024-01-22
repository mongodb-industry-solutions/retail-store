import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import Cart from "../cart/Cart";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/MongoDB_Logo.png"
            alt="MongoDB logo"
            width={175}
            height={50}
          ></Image>
        </Link>
      </div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className={styles.cart}>
        <Cart></Cart>
      </div>
    </nav>
  );
};

export default Navbar;
