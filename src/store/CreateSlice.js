import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGone: false,
  fanNomi: "",
  formLoading: false,
  IsSelected: false,
  selectedFan: "",
};

export const counterSlice = createSlice({
  name: "createSlice",
  initialState,
  reducers: {
    setIsGone: (state, action) => {
      state.value = action.payload;
    },
    setFanNomi: (state, action) => {
      state.fanNomi = action.payload;
    },
    setFormLoading: (state, action) => {
      state.formLoading = action.payload;
    },
    setIsSelected: (state, action) => {
      state.IsSelected = action.payload;
    },
    setSelectedFan: (state, action) => {
      state.selectedFan = action.payload;
    },
  },
});

export const {
  setIsGone,
  setFanNomi,
  setFormLoading,
  setIsSelected,
  setSelectedFan,
} = counterSlice.actions;

export default counterSlice.reducer;
