import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        products: [],      // [] or [...]
        _id: null,
        loading: true,      // true or false
        error: null         // null or {msg: ""}
    },
    reducers: {
        setCartProductsList: (state, action) => {
          console.log(action)
            if(action.payload === null){ 
              // cart is null when the document for this user's cart does not exist on Atlas
              return {...state, products: [], _id: null, loading: false, error: null}
            }else{
              return {...state, products: [...action.payload.products],  _id: action.payload._id, loading: false, error: null}
            }
        },
        addProduct: (state, action) => {
            return {...state, products: [...state.products, action.payload]}            
        },
        removeProduct: (state, action) => {
            let newList = state.products.filter(product => product.id !== action.payload.id)
            return {...state, products: [...newList]}        
        },
        setLoading: (state, action) => {
            return {...state, loading: action.payload}
        },
        setError: (state, action) => {
            if(error === null)
                return {...state, error: null}
            else
                return {...state, error: {...action.payload}}
        }
    }
})

export const {
    setCartProductsList,
    addProduct, 
    removeProduct, 
    setLoading, 
    setError
} = CartSlice.actions

export default CartSlice.reducer

/*
 Example of cart schema:
{
  "_id": {
    "$oid": "67044acda3c44529d63d9442"
  },
  "products": [
    {
      "amount": {
        "$numberInt": "2"
      },
      "brand": "Indigo",
      "code": "INMPBT-MDB0001",
      "description": "Indigo Nation Men Printed Black T-shirt",
      "id": {
        "$oid": "65e1e313cffbb90f3409a3cf"
      },
      "image": {
        "url": "http://assets.myntassets.com/v1/images/style/properties/7a1bc7d255671c7f4b85f1b1b35e945b_images.jpg"
      },
      "name": "Indigo Nation Men Printed Black T-shirt",
      "price": {
        "amount": {
          "$numberDouble": "20.0"
        },
        "currency": "USD"
      }
    }
  ],
  "user": {
    "$oid": "66fe219d625d93a100528224"
  }
}
*/