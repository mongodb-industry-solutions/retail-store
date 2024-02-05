
import "../../fonts.css";
import styles from "./about.module.css";
import TeamCard from "../teamcard/TeamCard";

const About = () => {



  return (

    <div className={styles.aboutContainer}>


      <h1>About</h1>

      <div className={styles.firstSection}>
        <div className={styles.disclaimer}>

          <h3>Disclaimer: Simulated Ecommerce Store for Demo Purposes</h3>

          <p>
            Welcome to our ecommerce store! Please note that this website is a simulated ecommerce platform created solely for demonstration purposes. It serves as a showcase for the powerful features and capabilities of MongoDB.

            The products, prices, and any other content on this site are entirely fictional and do not represent a real business. No actual transactions or purchases can be made on this platform.

            Thank you for joining us in this demo experience, and we hope you enjoy exploring the capabilities of MongoDB!
          </p>

        </div>

        <div>
          <img className={styles.aboutImg} src="/aboutIllo.png"></img>
        </div>
      </div>
      <h3>Team</h3>

      <div className={styles.teamcards}>
        <TeamCard
          photo="/francesco.png"
          name="Francesco Baldissera"
          title="Retail Consultant, Industry Solutions"
          subtitle="..."
        />

        <TeamCard
          photo="/francesco.png"
          name="Pedro Bereilh"
          title="Specialist, Industry Solutions"
          subtitle="..."
        />


        <TeamCard
          photo="/rami.png"
          name="Rami Pinto"
          title="Sr Specialist, Industry Solutions"
          subtitle="..."
        />

        <TeamCard
          photo="/ainhoa.png"
          name="Ainhoa Mugica"
          title="Specialist, Industry Solutions"
          subtitle="Designer and Frontend Developer"
        />

        {/* Add more TeamMemberCard components as needed */}
      </div>

      <h3>Links</h3>

      <p>Link to Github</p>

    </div>
  );
};

export default About;
