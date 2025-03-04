# Retail store buying experience


## Table of Contents
<details>
  <ol>
    <li><a href="#abstract">Abstract</a></li>
    <li><a href="#overview">Overview</a></li>
    <li>
        <a href="#features">Features</a>
        <ol>
            <li><a href="#agentic-rag-chatbot-with-dataworkz">Agentic RAG Chatbot (with Dataworkz)</a></li>
            <li><a href="#omnichannel-ordering-solution">Omnichannel Ordering Solution</a> </li>
            <li><a href="#personalized-recommendations-from-digital-receipts">Personalized recommendations from digital receipts</a></li>
        </ol>
    </li>
    <li><a href="#authors-&-contributors">Authors & Contributors</a></li>
    </ol>
</details>

## Abstract

This repository contains a MongoDB-powered retail store demo designed to illustrate how MongoDB can enhance the modern e-commerce experience and can be easilly be integrated with modern technologies to enhance the shopping experience for the customer. The demo highlights various features that serve as a reference architecture for developers looking to integrate MongoDB into retail solutions.

Built with modern technologies, this demo is continuously evolving with new features added over time. Some features are developed in collaboration with [MongoDB partners](https://cloud.mongodb.com/ecosystem/) to create cutting-edge, scalable e-commerce solutions.

This README will guide you through the steps and prerequisites needed to replicate the demo in your own environment. Since some features require third-party services or specific configurations, the README is organized to help you focus on the features that interest you most. Each feature has its own dedicated section to guide you through the setup process, ensuring a smooth and streamlined experience.

## Overview

In today's retail landscape, customers expect not just products, but exceptional service experiences. It's more important than ever for brands to connect with customers in meaningful, personalized ways - providing relevant recommendations, instant support, and unique experiences that feel tailored just for them.

Modern retail customers expect:
- **Immediate responses** to support queries 24/7
- **Contextual understanding** of their purchase history and preferences
- **Consistent information** across all touchpoints
- **Intelligent assistance** that understands complex questions
- **Personalized recommendations** based on their unique needs

This repository contains demos highlighting key features of a contemporary retail environment, with special focus on how MongoDB optimizes data management and enhances system performance as well as its easiness to integrate with AI-powered technologies such as the Agentic RAG chatbot integration.

## Prerequisites

Let’s get started! To follow along smoothly and run this demo in your own environment, make sure you have the following tools: 

- MongoDB Atlas Account. Create an Atlas account at https://cloud.mongodb.com
- Install Node. This will be required to install the node modules which contain all the necessary packages to run our demo. 
- Install Git. This will be required to clone the demo repository.

Depending on the feature or features you wish to run you might need additional instals. 

## Features

### Agentic RAG Chatbot (with Dataworkz)

MongoDB's flexible document model provides the ideal foundation, storing rich operational data that seamlessly connects with [Dataworkz's](https://dataworkz.com) Agentic RAG capabilities, demonstrating how modern retail environments can deliver superior customer experiences through intelligent data orchestration.

This showcase features an Agentic RAG chatbot that intelligently navigates between operational data and support documentation to deliver comprehensive customer assistance. The solution leverages Dataworkz's Agentic RAG platform to dynamically:

- Access real-time order, inventory, and customer data from MongoDB's operational database
- Reference policies and procedures from support documentation
- Intelligently determine which data sources to query based on the specific customer question
- Synthesize information from multiple sources when needed for complete answers

See the full step by step [README](.//resources/chatbot/README.md) to run this microservice from your own environment in the demo.

<details>

Tech Stack:

- MongoDB Atlas Account
- Dataworkz Account
- Node

Partners:
- [Dataworkz](https://cloud.mongodb.com/ecosystem/dataworkz)

</details>

### Omnichannel Ordering Solution

Customers expect a seamless shopping experiences that blend online and offline seamlessly. To meet these evolving needs, retailers must offer convenient options like Buy Online, Pick Up In Store (BOPIS) and home delivery. This microservice will allow you to create a new order selecting your desired shipping method. 

See the full step by step [README](.//resources/omnichannel/README.md) to run this microservice from your own environment in the demo.

<details>

Tech Stack:
- MongoDB Atlas Account
- Node
</details>

### Personalized recommendations from digital receipts

Comming soon!

## Authors & Contributors

### Lead Authors   
[Prashant Juttukonda](https://www.mongodb.com/blog/authors/prashant-juttukonda) - Principal

[Rodrigo Leal](https://www.mongodb.com/blog/authors/rodrigo-leal) - Principal

[Genevieve Broadhead](https://www.mongodb.com/blog/authors/genevieve-broadhead) - Global lead, retail solutions

[Angie Guemes](https://www.mongodb.com/developer/author/angie-guemes-estrada/) – Developer & Maintainer 

Florencia Arin – Developer & Maintainer 


### Contributors  
This demo was made possible with the contributions of:  
[Sachin Smotra](https://www.dataworkz.com/) – Contributed to Agentic RAC chatbot  
[Sachin Hejip](https://www.dataworkz.com/) – Contributed to Agentic RAC chatbot  
