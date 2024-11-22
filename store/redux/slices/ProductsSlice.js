import { createSlice } from "@reduxjs/toolkit";
import { SEARCH_TYPES } from "../../app/_lib/constants";

const ProductsSlice = createSlice({
    name: "Products",
    initialState: {
        products: {}, // {id: {...}, id: {...}, ...}
        filters: {},
        searchType: SEARCH_TYPES.atlasSearch,
        searchIsLoading: false,
        initialLoad: false,
        error: null,         // null or {msg: ""}
        openedProductDetails: null // null or {...} este es el 
    },
    reducers: {
        setLoading: (state, action) => {
            return { ...state, searchIsLoading: action.payload }
        },
        setError: (state, action) => {
            if (error === null)
                return { ...state, error: null }
            else
                return { ...state, error: { ...action.payload } }
        },
        setInitialLoad: (state, action) => {
            return { ...state, initialLoad: action.payload }
        },
        setSearchTypeValue: (state, action) => {
            return {
                ...state,
                searchType: action.payload
            }
        },
        setProducts: (state, action) => {
            return {
                ...state,
                products: {...action.payload},
                searchIsLoading: false,
                error: null,

            }
        },
        //setOpenedProductDetails
    }
})

export const {
    setLoading,
    setError,
    setSearchTypeValue,
    setProducts,
    setInitialLoad
} = ProductsSlice.actions

export default ProductsSlice.reducer
