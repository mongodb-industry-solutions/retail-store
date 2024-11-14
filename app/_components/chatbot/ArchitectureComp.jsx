"use client"

import React from 'react';
import Image from 'next/image';

import styles from "./chatbotComp.module.css";
import { Body, Description, H3, Label } from '@leafygreen-ui/typography';

const ArchitectureComp = () => {

    return (
        <div className={styles.ArchitectureComp}>
            <div style={{ width: '90%' }}>
                <Image
                    src="/rsc/diagrams/chatbotDiagram.png" // Replace with your image path
                    alt="Dataworkz + MDB architecture"
                    layout="responsive"
                    width={100} // Arbitrary width for setting aspect ratio
                    height={60} // Arbitrary height to set the aspect ratio
                />
            </div>
            <H3>Why MongoDB Atlas and Dataworkz?
            </H3>
            <div>
            <a href='https://www.mongodb.com/products/platform/atlas-database' target='_blank'>MongoDB Atlas</a> and <a href='https://www.dataworkz.com/' target='_blank'>Dataworkz</a> work together to deliver Agentic RAG-as-a-Service for a smarter, more responsive customer experience. Here’s a quick breakdown of how:
            <ul>
                <li>
                    <strong>Vector Embeddings and Smart Search:</strong> MongoDB Atlas can turn words, phrases, or even customer behaviors into vector embeddings—essentially numbers that capture their meaning in a way that’s easy for AI to understand. This makes it possible to search for content based on meaning rather than exact wording, so search results are more accurate and relevant.
                </li>
                <li>
                    <strong>Scalable, Reliable Performance:</strong> Atlas’ cloud-based, distributed setup is built to handle high-traffic retail environments, meaning no disruptions during peak shopping times.
                </li>
                <li>
                    <strong>Deep Context with Dataworkz’s Agentic RAG-as-a-Service: </strong>Create agentic workflows powered by RAG pipelines that combine lexical & semantic search with Knowledge Graphs to fetch the most relevant data from unstructured, operational and analytical data sources before generating AI responses.
                </li>

            </ul>
            This combo gives ecommerce brands the power to personalize experiences at a scale that’s never been possible before.
            </div>            
        </div>
    );
};

export default ArchitectureComp;