import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: false,
  },
  reducers: {
    setError: (state, action)=>{
        state.error = action.payload;
    }
  }
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
