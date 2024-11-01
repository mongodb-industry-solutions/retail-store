"use client"

import React, { useState } from 'react';
import { Body, Description } from '@leafygreen-ui/typography';
import Button from "@leafygreen-ui/button";

import styles from "./chatbotComp.module.css";


const suggestions = [
    "Can I pickup my order in a physical store?",
    "How much time do I have to cancel my order?"
]
const initialMessage = `Hi there! I am a GenAI Chatbot design to assist you! \n `

const ChatbotComp = () => {
    const [inputValue, setInputValue] = useState("");
    const [isAsking, setIsAsking] = useState(false);
    const [messages, setMessages] = useState([]);


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSuggestion = (index) => {
        setInputValue(suggestions[index]);
    };

    const handleAsk = async () => {

    }

    return (
        <div className={`${styles.modalContentTab} d-flex flex-column`}>
            <div className={styles.chatbotBody}>
                <Body className={styles.introBubble}>{initialMessage}</Body>

                {messages.map((message, index) => (
                    <div key={index} className={styles.chatMessage}>
                        <div
                            className={`${styles.speechBubble} ${index % 2 === 0 ? styles.userBubble : styles.answerBubble}`}
                        >
                            {index % 2 === 0 ? (
                                <Body>{message}</Body>
                            ) : (
                                <Body>
                                    {message}  {/* <Typewriter text={message} />  Typewriter renders the markdown text */}
                                </Body>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.suggestedQuestions}>
                <Body>Suggested Questions:</Body>
                {
                    suggestions.map((suggestion, index) =>
                        <button className={styles.suggestion} onClick={() => handleSuggestion(index)}>
                            <Description>{suggestion}</Description>
                        </button>
                    )
                }
            </div>

            <div className={styles.chatbotInputArea}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your question..."
                />
                <Button onClick={handleAsk} variant="baseGreen" disabled={!inputValue || isAsking}>
                    {isAsking ? "Asking..." : "Ask"}
                </Button>
            </div>
        </div>
    );
};

export default ChatbotComp;