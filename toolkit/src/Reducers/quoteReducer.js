import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { networkReq,newReq } from "../helpers/network";

const initialState = [];

export const createQuote = createAsyncThunk(
    'createquote', async (body) => {
        const result = await networkReq('/createquotes',body)
        return result
    }
)
export const fetchQuote = createAsyncThunk(
    'fetchquote', async (body) => {
        const result = await newReq('/getquotes',"get")
        return result
    }
)
export const deleteQuote = createAsyncThunk(
    'deletequote', async (id) => {
        const result = await newReq(`/remove/${id}`,"delete")
        return result
    }
)
const quoteReducer = createSlice({
    name: "quote",
    initialState, 
    reducers: {}, 
    extraReducers:{
        [createQuote.fulfilled]:(state,{payload:{message}})=>{
             if(message){
                state.push(message)
             }
        },
        [fetchQuote.fulfilled]:(state,{payload:{message}})=>{
              return message;
        },
        [deleteQuote.fulfilled]:(state,{payload:{message}})=>{
           const removedquote =  state.filter((item)=>{
               return item._id != message._id
             })
             return removedquote;
        }
     }
})

export default quoteReducer.reducer; 