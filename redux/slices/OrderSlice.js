import { shippingMethods } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
/* Order Details Page opened */

const OrderSlice = createSlice({
    name: "Order",
    initialState: {
        _id: null,          // ObjectId of the order
        shippingMethod: null, // one of shippingMethods available on lib/constants.js
        isCanceled: false,  // true || false
        loading: true,      // true or false
        error: null         // null or {msg: ""}

        // ... rest of the fields
    },
    reducers: {
        setOrder: (state, action) => {
            const shippingMethod = action.payload.type.toLowerCase().includes('store') 
                ? shippingMethods.bopis 
                : shippingMethods.home;
            const packageIsInTheStore =  (shippingMethod.id === shippingMethods.bopis.id) && (action.payload.status_history[action.payload.status_history.length - 1]?.status.toLowerCase().includes('ready'))
            const isCanceled = action.payload.status_history[action.payload.status_history.length - 1]?.status.toLowerCase().includes('cancel')
            const totalPrice = action.payload.products?.reduce((sum, product) => sum + (product.price.amount * (product.amount || 1)), 0);
            const totalAmount = action.payload.products?.reduce((sum, product) => sum + (product.amount || 1), 0);
            return {
                ...action.payload,
                _id: action.payload._id,
                shippingMethod,
                isCanceled,
                packageIsInTheStore,
                totalPrice,
                totalAmount,
                loading: false, 
                error: null
            }
        },
        clearOrder: (state, action) => {
            return {
                _id: null,          // ObjectId of the order
                loading: true,      // true or false
                error: null         // null or {msg: ""}
                // ... rest of the fields
            }
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
    setOrder,
    clearOrder,
    setLoading, 
    setError
} = OrderSlice.actions

export default OrderSlice.reducer

/*
 Example of order schema:
{
  "_id": {
    "$oid": "67043841a3c44529d63d9440"
  },
  "products": [
    {
      "id": "65e1e313cffbb90f3409a3ce",
      "amount": {
        "$numberInt": "2"
      },
      "brand": "Helix",
      "code": "HWSDW-MDB0001",
      "description": "Helix Women Silver Dial Watch",
      "image": {
        "url": "http://assets.myntassets.com/v1/images/style/properties/Helix-Women-Silver-Dial-Watch_43fa66002d9a709539eb6ff7ed9384ce_images.jpg"
      },
      "name": "Helix Women Silver Dial Watch",
      "price": {
        "amount": {
          "$numberDouble": "20.0"
        },
        "currency": "USD"
      }
    }
  ],
  "shipping_address": "Av. Lázaro Cárdenas 305, Guadalajara 44030, Mexico",
  "status_history": [
    {
      "status": "In process",
      "timestamp": {
        "$date": {
          "$numberLong": "946706400000"
        }
      }
    },
    {
      "status": "Canceled",
      "timestamp": {
        "$date": {
          "$numberLong": "946707000000"
        }
      }
    }
  ],
  "type": "Buy Online Pickup in Store",
  "user": {
    "$oid": "65a546ae4a8f64e8f88fb89e"
  }
}
*/