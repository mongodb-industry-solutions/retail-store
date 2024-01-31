import styles from './footer.module.css'; 
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 .local Pop-Up. All rights reserved</p>
      </div>

      <div className={styles.footerLogo}>
        <Image src="/MongoDB_White.png" alt="MongoDB Logo" width={90} height={22}></Image>
      </div>

    </footer>

  );
};

export default Footer;
