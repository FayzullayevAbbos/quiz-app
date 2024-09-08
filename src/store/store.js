import { configureStore } from '@reduxjs/toolkit'
import CreateSlice ,{ counterSlice } from './CreateSlice' 
import StartSlice from './StartSlice'

export const store = configureStore({
  reducer: {
    craete:CreateSlice,
    start:StartSlice
  }
})