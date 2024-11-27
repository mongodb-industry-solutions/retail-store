import { createSlice } from "@reduxjs/toolkit";
//import { SEARCH_TYPES } from "../../app/_lib/constants";

const ProductsSlice = createSlice({
    name: "Products",
    initialState: {
        products: {}, // {id: {...}, id: {...}, ...}
        query: '', 
        filters: {}, // {selectedBrands: {String, String...}, selectedCategories: {String, String...} }
        //searchType: SEARCH_TYPES.atlasSearch,
        searchIsLoading: false,
        initialLoad: false,
        error: null,         // null or {msg: ""}
        openedProductDetails: null // null or {...} este es el 
    },
    reducers: {
        setQuery: (state, action) => {
            return { ...state, query: action.payload }
        },
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
        updateProductPrice: (state, action) => {
            let newProducts = {...state.products}
            newProducts[action.payload.objectId] = {
                ...state.products[action.payload.objectId], 
                pred_price: action.payload.newPredPrice
            }
            return {
                ...state,
                products: {...newProducts},
                searchIsLoading: false,
                error: null,

            }
        },
        setFilters: (state, action) => {
            return {
                ...state,
                filters: {...action.payload},
                searchIsLoading: false,
                error: null,

            }
        },
        setOpenedProductDetails: (state, action) => {
            let newOpenedProductDetails = action.payload == null ? null : {...action.payload}
            return {
                ...state,
                openedProductDetails: newOpenedProductDetails,
            }
        }

    }
})

export const {
    setLoading,
    setError,
    setSearchTypeValue,
    setProducts,
    setInitialLoad,
    setFilters,
    setQuery,
    updateProductPrice,
    setOpenedProductDetails
} = ProductsSlice.actions

export default ProductsSlice.reducer
