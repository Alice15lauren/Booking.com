import { createSlice } from "@reduxjs/toolkit";

const initialState={
    list:[],
    loading:false,
    error:null
};

const moviesSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{
        fetchMoviesStart(state){
            state.loading=true;
            state.error=null;
        },
        fetchMoviesSuccess(state,action){
            state.loading=false;
            state.list=action.payload;  
        },
        fetchMoviesFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        }
    }
});

export const {fetchMoviesFailure,fetchMoviesStart,fetchMoviesSuccess}=moviesSlice.actions;
export default moviesSlice.reducer; 