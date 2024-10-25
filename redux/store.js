import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice'

const store = configureStore({
    reducer: {
        "User": UserReducer
    }
});

export default store;
