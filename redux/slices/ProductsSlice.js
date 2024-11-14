import { SEARCH_TYPES } from "@/app/_lib/constants";
import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
    name: "Products",
    initialState: {
        products: [],
        filters: {},
        searchType: SEARCH_TYPES.atlasSearch,
        searchIsLoading: false,
        initialLoad: false,
        error: null,         // null or {msg: ""}
        loading: false,
        openedProductDetails: null // null or {...} este es el 
    },
    reducers: {
        setLoading: (state, action) => {
            return { ...state, loading: action.payload }
        },
        setError: (state, action) => {
            if (error === null)
                return { ...state, error: null }
            else
                return { ...state, error: { ...action.payload } }
        },
        setOpenedProductDetails
    }
})

export const {
    setLoading,
    setError,
} = ProductsSlice.actions

export default ProductsSlice.reducer
