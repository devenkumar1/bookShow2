// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/userSlice'; 
import movieReducer from '@/store/MovieSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    movies:movieReducer
   }
});

export default store;
