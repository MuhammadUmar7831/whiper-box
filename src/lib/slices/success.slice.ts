import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface successState {
    success: boolean | string;
}

const initialState: successState = {
    success: false,
};

const successSlice = createSlice({
    name: 'success',
    initialState,
    reducers: {
        setSuccess(state, action: PayloadAction<boolean | string>) {
            state.success = action.payload;
        },
        clearSuccess(state){
            state.success = false;
        }
    },
});

export const { setSuccess, clearSuccess } = successSlice.actions;

export default successSlice.reducer;