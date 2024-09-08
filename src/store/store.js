import { configureStore } from '@reduxjs/toolkit'
import CreateSlice ,{ counterSlice } from './CreateSlice' 

export const store = configureStore({
  reducer: CreateSlice
})