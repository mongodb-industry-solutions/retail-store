import styles from './footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>About Us</h4>
          <p>Leafy Shop</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>Email: leafy@shop.com</p>
          <p>Phone: +1 123 456 7890</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 Leafy Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
