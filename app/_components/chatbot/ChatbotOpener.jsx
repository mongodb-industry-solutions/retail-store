"use client"

import React, { useState, useEffect } from 'react';
import { Body } from '@leafygreen-ui/typography';

import styles from "./chatbotComp.module.css";
import ChatbotModal from './ChatbotModal';
import Icon from '@leafygreen-ui/icon';

const ChatbotOpener = () => {
    const [isOpen, setIsOpen] = useState(false);  
  
    const handleClose = () => {
      setIsOpen(false);
    };

    return (
        <>
            <ChatbotModal isOpen={isOpen} handleClose={handleClose}/> 
            <div className={styles.chatbotButton} onClick={() => setIsOpen(true)}>
                {/* <Icon className={styles.chatIcon} glyph='Sparkle' ></Icon> */}
                <img src="/rsc/icons/chat_icon.png" alt="Chat Icon" className={styles.chatIcon} />
                <span><Body className={styles.chatbotText}><strong>How can I help?</strong></Body></span>
            </div>
        </>
    );
};

export default ChatbotOpener;