import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        products: [],       // [] or [...]
        totalPrice: 0,      // total cost
        totalAmount: 0,     // amount of items on the cart
        _id: null,          // ObjectId of the cart
        loading: true,      // true or false
        error: null         // null or {msg: ""}
    },
    reducers: {
        setCartProductsList: (state, action) => {
          console.log(action)
            if(action.payload === null){ 
              // cart is null when the document for this user's cart does not exist on Atlas
              return {...state, products: [], totalPrice: 0, totalAmount: 0, _id: null, loading: false, error: null}
            }else{
              const totalPrice = action.payload.products.reduce((sum, product) => sum + (product.price.amount * product.amount), 0);
              const totalAmount = action.payload.products.reduce((sum, product) => sum + product.amount, 0);
              return {...state, products: [...action.payload.products], totalPrice, totalAmount,  _id: action.payload._id, loading: false, error: null}
            }
        },
        addProduct: (state, action) => {
          // TODO re calculate totalPrice and totalAmount
            return {...state, products: [...state.products, action.payload]}            
        },
        removeProduct: (state, action) => {
            // TODO re calculate totalPrice and totalAmount
            let newList = state.products.filter(product => product.id !== action.payload.id)
            return {...state, products: [...newList]}        
        },
        setTotalPrice: (state, action) => {
          return {...state, totalPrice: action.payload}
        },
        setTotalAmount: (state, action) => {
          return {...state, totalAmount: action.payload}
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
    setTotalPrice,
    setTotalAmount,
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