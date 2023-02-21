import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice';

// store
export const store = configureStore({
    reducer: {
        productsReducer
    },
})