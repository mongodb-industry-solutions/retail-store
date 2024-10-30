import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice'
import CartReducer from './slices/CartSlice'

const store = configureStore({
    reducer: {
        "User": UserReducer,
        "Cart": CartReducer
    }
});

export default store;
