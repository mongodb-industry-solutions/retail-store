"use client"

import React, { useState } from 'react';
import Icon from '@leafygreen-ui/icon';
import { Modal, Container, ModalHeader, ModalFooter } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { H3 } from '@leafygreen-ui/typography';
import { Tabs, Tab } from '@leafygreen-ui/tabs';

import styles from "./chatbotComp.module.css";
import ChatbotComp from './ChatbotComp';
import ArchitectureComp from './ArchitectureComp';
import Image from 'next/image';
import ChatbotLogin from './ChatbotLogin';

const ChatbotModal = ({ isOpen, handleClose }) => {
    const [selected, setSelected] = useState(0)
    const allowChatbot = useSelector(state => state.Chatbot.allowChatbot)

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={'md-down'}
            className={styles.leafyFeel}
            backdrop="static"
        >
            <ModalHeader className="d-flex flex-row justify-content-between">
                <div />
                <H3><Image width={25} height={25} alt="Chat Icon" src="/rsc/icons/headphones-solid.svg" /> RAG Chatbot </H3>
                <Icon className='cursorPointer' onClick={() => handleClose()} glyph="X" />
            </ModalHeader>
            <Tabs setSelected={setSelected} selected={selected}>
                <Tab className={styles.backgroundGray} name="Chatbot">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                        {
                            allowChatbot === true
                                ? <ChatbotComp />
                                : <div className={styles.ArchitectureComp}>
                                    <ChatbotLogin />
                                </div>
                        }
                    </Container>
                </Tab>
                <Tab className={styles.backgroundGray} name="How to demo">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                        <div className={styles.ArchitectureComp}>
                            <H3>How to demo? </H3>
                            <div className='mt-2'>
                                This Agentic RAG chatbot has the ability to reply with custom responses based on
                                the user’s order history + the policies of the e-commerce store. Because we
                                trained the Agent with a PDF policy document that contains the business
                                rules of the e-commerce store (cancellation policy, shipping methods, return
                                policy, etc…). PDF lives in Dataworkz, the embeddings of the PDF are stored
                                in mongo. As well as all the entire e-commerce data, see the resources to
                                know more details of the architecture.
                                
                                <ol className='mt-2'>
                                    <li>
                                        Inside the "Chatbot" tab you will get an initial message which lists the latest 5 orders of the user since the user logged in. (Excluding any new orders created just now, you should re-login to see it listed as the latest)
                                    </li>
                                    <li>
                                        You can use the “suggested questions” above the text input to start a
                                        conversation, or get ideas on what to ask.
                                    </li>
                                    <li>
                                        The Agent response includes this icon <Image width={35} height={25} alt="Chat Tooltip" src="/rsc/images/chatbotTooltip.png" />  which shows the entire Agent
                                        response. We are only showing the <mark>response.answer</mark> in the bubble but, you
                                        can use this <Image width={35} height={25} alt="Chat Tooltip" src="/rsc/images/chatbotTooltip.png" /> insight to show the complete answer from the agent.
                                    </li>
                                    <li>
                                        Example of conversation you could do
                                    </li>
                                </ol>

                                <p><strong>Note: </strong> If you wish to see what the PDF contains to tailor any question you can see it inside the <a href='https://github.com/mongodb-industry-solutions/retail-store-v2/blob/main/resources/LeafyCorpPolicy.pdf' target='_blank'>Github repository of the demo</a></p>
                            </div>
                        </div>
                    </Container>
                </Tab>
                <Tab className={styles.backgroundGray} name="Behind the scenes">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                        <ArchitectureComp />
                    </Container>
                </Tab>
                <Tab className={styles.backgroundGray} name="Why MongoDB & Dataworkz">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                        <div className={styles.ArchitectureComp}>
                            <H3>Why MongoDB Atlas and Dataworkz? </H3>
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
                    </Container>
                </Tab>
            </Tabs>
            <ModalFooter />
        </Modal>
    );
};

export default ChatbotModal;