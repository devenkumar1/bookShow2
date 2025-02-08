import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies=createAsyncThunk(
    "movies/getAllMovies",
    async(_,{rejectWithValue})=>{
        try{
            const response=await axios.get("http://localhost:4000/auth/media/movies");
            const data=response.data.movies;
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

const movieSlice=createSlice(
    {
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },

  extraReducers:(builder)=>{
    builder
    .addCase(getAllMovies.pending,(state)=>{
        state.loading=true;
    })
    .addCase(getAllMovies.fulfilled,(state,action)=>{
        state.loading=false;
        state.movies=action.payload;
        state.error=null;
    })
    .addCase(getAllMovies.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
  }


    }
)

export default movieSlice.reducer