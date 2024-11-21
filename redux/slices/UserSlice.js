import { fetchOrders } from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Thunks to fetch various user data
export const fetchUserData = createAsyncThunk( 'User/fetchUserData',
    async (userId, { dispatch }) => {
      const [orders]/*TODO cart] */= await Promise.all([
        fetchOrders(userId),
        //TODO: api.get(`/api/cart?userId=${userId}`),
      ]);
      return { orders}//, cart };
    }
  );


const UserSlice = createSlice({
    name: "User",
    initialState: {
        usersList: [],      // [] or [...]
        selectedUser: null, // null or {...}
        loading: true,      // true or false
        error: null,         // null or {msg: ""}
        orders: {
            loading: true,
            error: null,
            list: [],
            initialLoad: false,
            updateToggle: false
        },
        // TODO cart: {}
    },
    reducers: {
        setUsersList: (state, action) => {
            return {...state, usersList: [...action.payload]}
        },
        addUsersNewOrder: (state, action) => {
            let newOrders = [action.payload.order, ...state.orders.list]
            return {
                ...state,
                orders: {
                    ...state.orders,
                    updateToggle: !state.orders.updateToggle,
                    list: newOrders
                }
            }
        },
        setSelectedUser: (state, action) => {
            return {...state, selectedUser: {...action.payload}}
        },
        setLoadingUsersList: (state, action) => {
            return {...state, loading: action.payload}
        },
        setErrorUsersList: (state, action) => {
            if(error === null)
                return {...state, error: null}
            else
                return {...state, error: {...action.payload}}
        },
        updateUsersOrder: (state, action) => {
            let newList = [...state.orders.list]
            for (let index = 0; index < newList.length; index++) {
                if (newList[index]._id === action.payload.orderId){
                    newList[index] = {...action.payload.order}
                    break;
                }
            }
            //console.log('newList', newList)
            return {
                ...state, 
                orders: {
                    ...state.orders,
                    updateToggle: !state.orders.updateToggle,
                    list: [...newList]
                }
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            //console.log(action.payload)
            state.orders.loading = false
            state.orders.list = action.payload.orders;
            state.orders.initialLoad = true
            //TODO: state.cart = action.payload.cart;
        });
      },
})

export const {
    setUsersList, 
    addUsersNewOrder,
    setSelectedUser, 
    setLoadingUsersList, 
    setErrorUsersList,
    updateUsersOrder
} = UserSlice.actions

export default UserSlice.reducer

/*
 Example of User schema:
    {
    "_id": {
        "$oid": "65a546ae4a8f64e8f88fb89e"
    },
    "name": "Maria",
    "surname": "Torres",
    "type": "customer",
    "email": "maria.torres@gmail.com",
    "address": {
        "street_and_number": "Cuauhtemoc 100",
        "cp": "62240",
        "Country": "Mexico",
        "State": "Morelos",
        "city": "Cuernavaca"
    }
    }
*/