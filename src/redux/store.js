import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import moviesReducer from "./slices/moviesSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer
    }
})