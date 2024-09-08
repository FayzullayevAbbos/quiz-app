import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isGone: false,
  fanNomi:'',
  formLoading: false,
}

export const counterSlice = createSlice({
  name: 'createSlice',
  initialState,
  reducers: {
    setIsGone: (state , action) => {
      state.value = action.payload
    },
    setFanNomi:(state , action)=> {
      state.fanNomi = action.payload
    },
    setFormLoading:(state , action) => {
      state.formLoading = action.payload
    }
   
  },
})


export const { setIsGone , setFanNomi , setFormLoading} = counterSlice.actions

export default counterSlice.reducer