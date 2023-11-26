import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
       currentUser:null,
       authToken:null
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.currentUser=action.payload.currentUser;
            state.authToken=action.payload.authToken
        },
        logoutSuccess:(state,action)=>{
          state.currentUser=null;
          state.authToken=null
        },
        setUser:(state,action)=>{
          state.currentUser=action.payload.currentUser
        }
       

    }
})

export const {loginSuccess,logoutSuccess,setUser}=userSlice.actions
export default userSlice.reducer;