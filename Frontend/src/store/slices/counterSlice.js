import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      alert("Welcome!");
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    setCounter: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { increment, decrement, reset, setCounter } = counterSlice.actions;
export default counterSlice.reducer;
