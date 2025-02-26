"use client"

import React from 'react';
import Image from 'next/image';

import styles from "./chatbotComp.module.css";
import { H3 } from '@leafygreen-ui/typography';

const ArchitectureComp = () => {

    return (
        <div className={styles.ArchitectureComp}>
            <div style={{ width: '90%' }}>
                <Image
                    src="/rsc/diagrams/chatbotDiagram.png"
                    alt="Dataworkz + MDB architecture"
                    layout="responsive"
                    width={100} // Arbitrary width for setting aspect ratio
                    height={60} // Arbitrary height to set the aspect ratio
                />
            </div>
            <H3 className={'mt-1'}>What is an Agent?</H3>
            <div>
                An agent is an artificial computational entity with an awareness of its environment and associated data within the context. These agents can be used to interact in the case of ecommerce or perform a portion of complex tasks as needed.
            </div>
            <H3 className={'mt-1'}>RAG</H3>
            <div>
                Retrieval Augmented Generation is an architecture used to augment large language models (LLMs) with proprietary data so that they can generate more accurate and context-aware responses, while also reducing hallucinations.
            </div>
            <H3 className={'mt-1'}>Agentic RAG</H3>
            <div>
                Agentic RAG takes Conventional RAG a step further by introducing an AI agent-based implementation of RAG. In this model, different tools and functions can be accessed by the agent, enabling it to go beyond information retrieval and generation – it allows it to plan. Agents can determine if they need to retrieve specific information or not, which tool to use for the retrieval, and formulate queries. These capabilities are crucial as it enables the agent to pull information from multiple data sources, handling complex queries that require more than one source to formulate the response.
            </div>
        </div>
    );
};

export default ArchitectureComp;