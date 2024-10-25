import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "User",
    initialState: {
        usersList: [],      // [] or [...]
        selectedUser: null, // null or {...}
        loading: true,      // true or false
        error: null         // null or {msg: ""}
    },
    reducers: {
        setUsersList: (state, action) => {
            return {...state, usersList: [...action.payload]}
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
        }
    }
})

export const {
    setUsersList, 
    setSelectedUser, 
    setLoadingUsersList, 
    setErrorUsersList
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