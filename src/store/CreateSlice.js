import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isGone: false,
}

export const counterSlice = createSlice({
  name: 'createSlice',
  initialState,
  reducers: {
    setIsGone: (state , action) => {
      state.value = action.payload
    },
   
  },
})


export const { setIsGone } = counterSlice.actions

export default counterSlice.reducer