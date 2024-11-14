import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './slices/ProductsSlice'


const store = configureStore({
    reducer: {
        "Products": ProductsReducer
}
});

export default store;
