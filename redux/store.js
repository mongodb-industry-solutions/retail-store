import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice'
import CartReducer from './slices/CartSlice'
import OrderReducer from './slices/OrderSlice'
import ChatbotReducer from './slices/ChatbotSlice'

const store = configureStore({
    reducer: {
        "User": UserReducer,
        "Cart": CartReducer,
        "Order": OrderReducer,
        "Chatbot": ChatbotReducer
}
});

export default store;
