import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
/*
This is a minimized version of the schema that is send to dataworkz chatbot
*/
const ChatbotSlice = createSlice({
    name: "Chatbot",
    initialState: {
        initialMessage: null,
        minimizedOrderSchema: [],      // [] or [...]
        error: null,         // null or {msg: ""}
        loading: false,
        isLoadingAnswer: false,
        initialLoad:false,
        messages: [],
        allowChatbot: false, 
        // {
        //     content: '' || <></>,
        //     contentType: 'text' || 'html',
        //     role: ROLE.assistant || ROLE.user,
        //     isAnimationDone: false || true
        // }
    },
    reducers: {
        setOrderData: (state, action) => {
            return {
                ...state,  
                orderData: action.payload.orderData,
                initialLoad: true
            }
        },
        setInitialMessage: (state, action) => {
            return {...state,  initialMessage: {...action.payload}}
        },
        setLoading: (state, action) => {
            return { ...state, loading: action.payload }
        },
        setError: (state, action) => {
            if (error === null)
                return { ...state, error: null }
            else
                return { ...state, error: { ...action.payload} }
        },
        addMessage: (state, action) => {
            return {
                ...state, 
                messages: [
                    ...state.messages, 
                    {...action.payload, isAnimationDone: false }
                ],
            }
        },
        setAnimationMessage: (state, action) => {
            let newMessages = [...state.messages].map((message, i) =>
                i === action.payload.index
                ? { 
                    ...message, 
                    isAnimationDone: action.payload.isAnimationDone 
                }
                : {...message}
            )
            return {
                ...state,
                messages: [...newMessages],
            }
        },
        setIsLoadingAnswer: (state, action) => {
            return {...state,  isLoadingAnswer: action.payload}
        },
        setMinimizedOrderSchema: (state, action) => {
            return {
                ...state,  
                minimizedOrderSchema: [...action.payload], 
                initialLoad: true
            }
        },
        setAllowChatbot: (state, action) => {
            return {
                ...state,  
                allowChatbot: action.payload
            }
        },
    }
})

export const {
    setInitialMessage,
    setLoading,
    setError,
    addMessage,
    setIsLoadingAnswer,
    setMinimizedOrderSchema,
    setAnimationMessage,
    setAllowChatbot
} = ChatbotSlice.actions

export default ChatbotSlice.reducer
