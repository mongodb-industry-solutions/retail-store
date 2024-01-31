import styles from "./about.module.css";


const About = () => {
  return (

    <div className={styles.aboutContainer}>
      <h1>About</h1>

      <h3>Disclaimer: Simulated Ecommerce Store for Demo Purposes</h3>

      <p>
        Welcome to our ecommerce store! Please note that this website is a simulated ecommerce platform created solely for demonstration purposes. It serves as a showcase for the powerful features and capabilities of MongoDB.

        The products, prices, and any other content on this site are entirely fictional and do not represent a real business. No actual transactions or purchases can be made on this platform. 

        Thank you for joining us in this demo experience, and we hope you enjoy exploring the capabilities of MongoDB!
      </p>

      <h3>Team</h3>

      <h3>Links</h3>

    </div>
  );
};

export default About;
