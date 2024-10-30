
"use client";

import "../../fonts.css";
import styles from "./about.module.css";
import TeamCard from "../teamcard/TeamCard";
import Disclaimer from "../disclaimer/Disclaimer";

import Button from "@leafygreen-ui/button";
import Icon from "@leafygreen-ui/icon";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Link } from '@leafygreen-ui/typography';
import { Container } from "react-bootstrap";
//import Link from "next/link";

const About = () => {

  const githubRepoUrl = "https://github.com/mongodb-industry-solutions/retail-store";

  return (

    <Container>


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
          <img className={styles.aboutImg} src="/aboutillo.png"></img>
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

<div className={styles.cards} >
        <div className={styles.resourcesCard}>
          <Subtitle>E-Commerce AI-Enhanced Search</Subtitle>

          <Body className={styles.resourcesBody}>Integrate MongoDB and Databricks to create AI-augmented search solutions that meet current and future market expectations, ultimately improving the retail customer's search experience.</Body>

          <ul>
            <li><Link href="https://www.mongodb.com/blog/post/fusing-mongodb-databricks-deliver-ai-augmented-search#:~:text=Combining%20MongoDB%20with%20Databricks%2C%20using,the%20customer%20is%20using%20it.">Blog - Fusing MongoDB and Databricks to Deliver AI-Augmented Search</Link></li>
          </ul>

          <iframe width="560" height="315" src="https://www.youtube.com/embed/jntZz9RTC5g?si=7xu4aA2MxnXyL6lL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

       
        <div className={styles.resourcesCard}>
          <Subtitle>Inventory Management</Subtitle>

          <Body className={styles.resourcesBody}>Leverage MongoDB's document data model to implement an efficient inventory management system in the retail sector, aligning with customer demands and optimizing operational processes.</Body>
          <ul>
            <li><Link href="https://www.mongodb.com/blog/post/how-enhance-inventory-management-real-time-data-strategies">Blog - How to enhance inventory management with real-time data strategies</Link></li>
            <li><Link href="https://www.mongodb.com/developer/products/atlas/build-inventory-management-system-using-mongodb-atlas/">Tutorial - Build an Inventory Management System Using MongoDB Atlas</Link></li>
            <li><Link href="https://github.com/mongodb-industry-solutions/Inventory_mgmt">Inventory Management Github Repo</Link></li>
          </ul>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/sV2KfMk1CdM?si=u2-TeIFVmuC3E2VL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </div>

        
        <div className={styles.resourcesCard}>
          <Subtitle>Fueling Real-Time Pricing Strategies</Subtitle>
          <Body className={styles.resourcesBody}>Integrate MongoDB Atlas and Databricks can be a powerful combination for implementing real-time AI-driven pricing strategies.</Body>

          <ul>
            <li><Link href="https://www.mongodb.com/blog/post/fueling-pricing-strategies-mongodb-databricks">Blog - Fueling pricing strategies with MongoDB and Databricks</Link></li>
            <li><Link href="https://www.mongodb.com/developer/products/mongodb/leverage-event-driven-architecture-mongodb-databricks/">Tutorial - How to leverage an event-driven architecture with MongoDB and Databricks</Link></li>
            <li><Link href="https://github.com/mongodb-industry-solutions/Real-Time-Pricing">Real-Time Pricing Github Repo</Link></li>
          </ul>

          <iframe width="560" height="315" src="https://www.youtube.com/embed/Za8jMb3HXAc?si=H19NLxDk-ICw0RS5&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        </div>
      </LeafyGreenProvider>



    </Container>
  );
};

export default About;
