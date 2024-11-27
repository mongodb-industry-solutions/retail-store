import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice'
import OrderReducer from './slices/OrderSlice'
import ChatbotReducer from './slices/ChatbotSlice'
import ProductsReducer from './slices/ProductsSlice.js'

const store = configureStore({
    reducer: {
        "User": UserReducer,
        "Order": OrderReducer,
        "Chatbot": ChatbotReducer,
        "Products": ProductsReducer
}
});

export default store;
