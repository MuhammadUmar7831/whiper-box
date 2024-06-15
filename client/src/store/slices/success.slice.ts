import { createSlice } from "@reduxjs/toolkit";

export const successSlice = createSlice({
  name: "success",
  initialState: {
    success: false,
  },
  reducers: {
    setSuccess: (state, action)=>{
        state.success = action.payload;
    }
  }
});

export const { setSuccess } = successSlice.actions;

export default successSlice.reducer;
