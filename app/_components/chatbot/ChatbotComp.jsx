"use client"

import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Body, Description, H3 } from '@leafygreen-ui/typography';
import Button from "@leafygreen-ui/button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import styles from "./chatbotComp.module.css";
import { addMessage, setIsLoadingAnswer } from '@/redux/slices/ChatbotSlice';
import { ROLE } from '@/lib/constants';
import { fetchAssistantResponse } from '@/lib/api';
import Typewriter from '../typewriter/Typewriter';
import Icon from '@leafygreen-ui/icon';
import JsonDisplay from '../jsonDisplayComp/JsonDisplayComp';

const suggestions = [
    "Can I pickup my order in a physical store?",
    "How much time do I have to cancel my order?"
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
                                            ? <Body>
                                                {message.content}
                                            </Body>
                                            : <div>
                                                <Typewriter
                                                    text={message.content}
                                                ></Typewriter>
                                                <div className={styles.responseDetailsContainer}>
                                                    <OverlayTrigger
                                                        trigger="click"
                                                        placement={'top'}
                                                        overlay={
                                                            <Popover 
                                                                className={styles.popoverJson}
                                                            >
                                                                <Popover.Header as="h3">Response details</Popover.Header>
                                                                <Popover.Body>
                                                                    <JsonDisplay data={message.resJson}/>
                                                                </Popover.Body>
                                                            </Popover>
                                                        }
                                                    >
                                                        <Button size='xsmall'><Icon glyph='Sparkle'></Icon></Button>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        ))
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
                    placeholder={isLoadingAnswer ? "Assintent processing answer..." : "Type your question..."}
                />
                <Button onClick={handleAsk} variant="baseGreen" disabled={!askInputRef.current?.value.length === 0 || isLoadingAnswer}>
                    {isLoadingAnswer ? "Asking..." : "Ask"}
                </Button>
            </div>
        </div>
    );
};

export default ChatbotComp;