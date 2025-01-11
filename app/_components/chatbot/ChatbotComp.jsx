"use client"

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Body, Description } from '@leafygreen-ui/typography';
import Button from "@leafygreen-ui/button";

import styles from "./chatbotComp.module.css";
import { addMessage, setIsLoadingAnswer } from '@/redux/slices/ChatbotSlice';
import { ROLE } from '@/lib/constants';
import { fetchAssistantResponse } from '@/lib/api';
import { Spinner } from 'react-bootstrap';
import AssistantMessageComp from './AssistantMessageComp';

const suggestions = [
    "What can you do for me?",
    "How much time do I have to cancel an order?"
]

const ChatbotComp = () => {
    const dispatch = useDispatch();
    const selectedUserId = useSelector(state => state.User.selectedUser?._id);
    const initialMessage = useSelector(state => state.Chatbot.initialMessage);
    const minimizedOrderSchema = useSelector(state => state.Chatbot.minimizedOrderSchema);
    const isLoadingAnswer = useSelector(state => state.Chatbot.isLoadingAnswer);
    const messages = useSelector(state => state.Chatbot.messages);
    const askInputRef = useRef(null);

    const handleSuggestion = (index) => {
        askInputRef.current.value = suggestions[index];
    };

    const handleAsk = async () => {
        dispatch(setIsLoadingAnswer(true))
        const userQuery = askInputRef.current.value;
        askInputRef.current.value = '';
        // push user's message
        dispatch(addMessage({
            content: userQuery,
            contentType: 'text',
            role: ROLE.user
        }))
        // get assistance response
        let result = await fetchAssistantResponse(
            selectedUserId,
            userQuery,
            messages,
            minimizedOrderSchema
        );
        if (result) {
            // push assistance's message
            dispatch(addMessage({
                content: result.message,
                resJson: result.resJson,
                contentType: 'text',
                role: ROLE.assistant
            }))
        }
        dispatch(setIsLoadingAnswer(false))
    }
    
    const onKeyDownInput = (e) => {
        if(e.key === 'Enter')
            handleAsk()
    }

    return (
        <div className={`${styles.modalContentTab} d-flex flex-column`}>
            <div className={styles.chatbotBody}>
                {
                    initialMessage && 
                    <div 
                        className={styles.introBubble} 
                        dangerouslySetInnerHTML={{ __html: initialMessage.html }} 
                        onClick={() => console.log('minimizedOrderSchema', minimizedOrderSchema)}
                    />
                }
                {
                    messages
                        .filter(msg => msg.contentType !== 'init')
                        .map((message, index) => (
                            <div key={`msg-${index}`} className={styles.chatMessage}>
                                <div
                                    className={`${styles.speechBubble} ${message.role === ROLE.user ? styles.userBubble : styles.answerBubble}`}
                                >
                                    {
                                        message.role === ROLE.user
                                            ? <div>
                                                {message.content}
                                            </div>
                                            : <AssistantMessageComp 
                                                index={index} 
                                                content={message.content} 
                                                resJson={message.resJson}
                                                isAnimationDone={message.isAnimationDone}
                                                stylesResponseDetailsContainer={styles.responseDetailsContainer}
                                                stylesPopoverJson={styles.popoverJson}
                                            />
                                    }
                                </div>
                            </div>
                        ))
                }
                {
                   ( isLoadingAnswer || initialMessage === null ) &&
                    <div className={styles.chatMessage}>
                        <div className={`${styles.speechBubble} ${styles.answerBubble}`}>
                            <Spinner size="sm" animation="border" role="status" variant="success" className='me-2'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            Thinking...
                        </div>
                    </div>
                }
            </div>

            <div className={styles.suggestedQuestions}>
                <Body onClick={() => console.log(messages)}>Suggested Questions:</Body>
                {
                    suggestions.map((suggestion, index) =>
                        <button key={`sug-${index}`} className={styles.suggestion} onClick={() => handleSuggestion(index)}>
                            <Description>{suggestion}</Description>
                        </button>
                    )
                }
            </div>

            <div className={styles.chatbotInputArea}>
                <input
                    type="text"
                    ref={askInputRef}
                    disabled={isLoadingAnswer}
                    placeholder={isLoadingAnswer ? "Assistant processing answer..." : "Type your question..."}
                    onKeyDown={(e) => onKeyDownInput(e)}
                />
                <Button onClick={handleAsk} variant="baseGreen" disabled={!askInputRef.current?.value.length === 0 || isLoadingAnswer}>
                    {isLoadingAnswer ? "Asking..." : "Ask"}
                </Button>
            </div>
        </div>
    );
};

export default ChatbotComp;