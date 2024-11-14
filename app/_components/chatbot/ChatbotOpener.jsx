"use client"

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Body } from '@leafygreen-ui/typography';

import styles from "./chatbotComp.module.css";
import ChatbotModal from './ChatbotModal';
import Icon from '@leafygreen-ui/icon';
import { calculateInitialMessage, getMinimizedSchemaForDataworkz } from '@/lib/helpers';
import { addMessage, setInitialMessage, setMinimizedOrderSchema } from '@/redux/slices/ChatbotSlice';
import { ROLE } from '@/lib/constants';

const ChatbotOpener = () => {
    const dispatch = useDispatch();
    const ordersInitialLoad = useSelector(state => state.User.orders.initialLoad)
    const ordersList = useSelector(state => state.User.orders.list)
    const [isOpen, setIsOpen] = useState(false);  
    const selectedUser = useSelector(state => state.User.selectedUser)

    const handleClose = () => {
      setIsOpen(false);
    };

    useEffect(() => {
        const getOrderStatusForDataworkz = async () => {
            try {
                let result = await getMinimizedSchemaForDataworkz(ordersList);
                console.log('getMinimizedSchemaForDataworkz result', result)
                if(result){
                    dispatch(setMinimizedOrderSchema(result))
                    let initialMessage = await calculateInitialMessage(result);
                    console.log('initialMessage', initialMessage)
                    dispatch(setInitialMessage({
                        content: initialMessage.txt,
                        html: initialMessage.html,
                        contentType: 'init',
                        role: ROLE.assistant
                    }))
                    dispatch(addMessage({
                        content: initialMessage.txt,
                        contentType: 'init',
                        role: ROLE.assistant
                    }))
                }
            } catch (err) {
                console.log(`Error getting minimized schema for dataworkz, ${err}`)
            }
        };
        if(selectedUser !== null && ordersInitialLoad === true){
            getOrderStatusForDataworkz()
        }
    }, [ordersInitialLoad, selectedUser]);

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