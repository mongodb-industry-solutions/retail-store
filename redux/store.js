import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice'
import CartReducer from './slices/CartSlice'
import OrderReducer from './slices/OrderSlice'

const store = configureStore({
    reducer: {
        "User": UserReducer,
        "Cart": CartReducer,
        "Order": OrderReducer
}
});

export default store;
