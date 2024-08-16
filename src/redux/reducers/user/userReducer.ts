import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserReducerInitState } from "./userTypes";

const initialState:UserReducerInitState={
  user: null,
  loading:true
};

export const userReducer = createSlice({
  name:"userReducer",
  initialState,
  reducers:{
    userExist:(state,action:PayloadAction<User>)=>{
      state.loading=false;
      state.user = action.payload;
    },
    userDoesNotExist:(state)=>{
      state.loading=false;
      state.user = null;
    }
  }
});

export const {userExist,userDoesNotExist} = userReducer.actions;