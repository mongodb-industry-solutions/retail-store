"use client"

import React, { useState } from 'react';
import Icon from '@leafygreen-ui/icon';
import { Modal, Container, ModalHeader, ModalFooter } from 'react-bootstrap';
import { H3} from '@leafygreen-ui/typography';
import { Tabs, Tab } from '@leafygreen-ui/tabs';

import styles from "./chatbotComp.module.css";
import ChatbotComp from './ChatbotComp';
import ArchitectureComp from './ArchitectureComp';
import Image from 'next/image';

const ChatbotModal = ({ isOpen, handleClose }) => {
    const [selected, setSelected] = useState(0)

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
                <div/>
                <H3><Image width={25} height={25} alt="Chat Icon" src="/rsc/icons/headphones-solid.svg"/> RAG Chatbot </H3>
                <Icon className='cursorPointer' onClick={() => handleClose()} glyph="X" />
            </ModalHeader>
            <Tabs setSelected={setSelected} selected={selected}>
                <Tab className={styles.backgroundGray}  name="Chatbot">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                        <ChatbotComp/>
                    </Container>
                </Tab>
                <Tab className={styles.backgroundGray}  name="Architecture">
                    <Container className={`${styles.chatbotContainer} p-3 h-100`}>
                       <ArchitectureComp/>
                    </Container>
                </Tab>
            </Tabs>
            <ModalFooter/>
        </Modal>
    );
};

export default ChatbotModal;