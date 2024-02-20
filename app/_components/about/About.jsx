
"use client";

import "../../fonts.css";
import styles from "./about.module.css";
import TeamCard from "../teamcard/TeamCard";
import Disclaimer from "../disclaimer/Disclaimer";

import Button from "@leafygreen-ui/button";
import Icon from "@leafygreen-ui/icon";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline } from '@leafygreen-ui/typography';

const About = () => {

  const githubRepoUrl = "https://github.com/mongodb-industry-solutions/retail-store";

  return (

    <div className={styles.aboutContainer}>


      <H1>About</H1>

      <div className={styles.firstSection}>
        <div className={styles.disclaimer}>



          <Body className={styles.body}>
            This ecommerce platform serves as a showcase for the powerful features and capabilities of MongoDB.

            The products, prices, and any other content on this site are entirely fictional and do not represent a real business. No actual transactions or purchases can be made on this platform.

            <br></br>
            <br></br>
            Thank you for joining us in this demo experience, and we hope you enjoy exploring the capabilities of MongoDB!
          </Body>

          <Disclaimer></Disclaimer>

        </div>

        <div>
          <img className={styles.aboutImg} src="/aboutIllo.png"></img>
        </div>
      </div>
      <H3>Team</H3>

      <div className={styles.teamcards}>

        <TeamCard
          photo="/gen.png"
          name="Genevieve Broadhead"
          title="Global Lead, Retail Solutions"
          subtitle="Product Owner"
        />

        <TeamCard
          photo="/francesco.png"
          name="Francesco Baldissera"
          title="Retail Consultant, Industry Solutions"
          subtitle="Project Manager"
        />

        <TeamCard
          photo="/pedro.png"
          name="Pedro Bereilh"
          title="Specialist, Industry Solutions"
          subtitle="Full Stack Developer"
        />


        <TeamCard
          photo="/rami.png"
          name="Rami Pinto"
          title="Sr Specialist, Industry Solutions"
          subtitle="Cloud Engineer"
        />

        <TeamCard
          photo="/ainhoa.png"
          name="Ainhoa Mugica"
          title="Sr. Specialist, Industry Solutions"
          subtitle="Designer and Frontend Developer"
        />

        <TeamCard
          photo="/prashant.png"
          name="Prashant Juttukonda"
          title="Retail Principal, Industry Solutions"
          subtitle="Product Owner"
        />

        {/* Add more TeamMemberCard components as needed */}
      </div>

      <H3>Related Resources</H3>

      <LeafyGreenProvider>

        <div className={styles.githubButton}>
          <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
            <Button>
              <img src="/github.png" alt="GitHub" width={24} height={24} />
              Github Repo
            </Button>
          </a>
        </div>

      </LeafyGreenProvider>



    </div>
  );
};

export default About;
