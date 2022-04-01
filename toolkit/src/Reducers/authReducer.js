import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { networkReq } from "../helpers/network";

const initialState = {
    token: "",
    loading: false,
    error: "",
}


export const signupUser = createAsyncThunk(
    'signupuser', async (body) => {
        const result = await networkReq('/signup',body)
        return result
    }
)
export const signinUser = createAsyncThunk(
    'signinuser', async (body) => {
        const result = await networkReq('/signin',body)
        return result
    }
)
const authReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken :(state,action)=>{
            state.token = localStorage.getItem('token')
        },
        logout :(state,action)=>{
            state.token = null;
            localStorage.removeItem('token')
        }
    },
    extraReducers:{
        [signupUser.fulfilled]:(state,{payload:{error,message,token}})=>{
            state.loading= false
    
            if(error){
                state.error=error;
            }else{
                state.error = message;
               
            }
        },
        [signupUser.pending]:(state,action)=>{
            state.loading= true

        },
        [signinUser.pending]:(state,action)=>{
            state.loading= true  

        },
        [signinUser.fulfilled]:(state,{payload:{error,token}})=>{
            state.loading= false
    
            if(error){
                state.error=error; 
            }else{
                state.token = token;
                localStorage.setItem('token',token);
            }
        },
    }
})
export const {addToken,logout} = authReducer.actions
export default authReducer.reducer; 