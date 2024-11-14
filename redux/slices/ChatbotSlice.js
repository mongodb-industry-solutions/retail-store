import { createSlice } from "@reduxjs/toolkit";
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
        // {
        //     content: '' || <></>,
        //     contentType: 'text' || 'html',
        //     role: ROLE.assistant || ROLE.user
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
                return { ...state, error: { ...action.payload } }
        },
        addMessage: (state, action) => {
            return {
                ...state, 
                messages: [...state.messages, action.payload] }
        },
        setIsLoadingAnswer: (state, action) => {
            return {...state,  isLoadingAnswer: action.payload}
        },
        setMinimizedOrderSchema: (state, action) => {
            return {...state,  minimizedOrderSchema: [...action.payload], initialLoad: true}
        }
    }
})

export const {
    setInitialMessage,
    setLoading,
    setError,
    addMessage,
    setIsLoadingAnswer,
    setMinimizedOrderSchema
} = ChatbotSlice.actions

export default ChatbotSlice.reducer
