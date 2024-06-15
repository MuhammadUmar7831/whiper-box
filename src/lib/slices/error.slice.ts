import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface errorState {
    error: boolean | string;
}

const initialState: errorState = {
    error: false,
};

const ErrorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<boolean | string>) {
            state.error = action.payload;
        },
        clearError(state){
            state.error = false;
        }
    },
});

export const { setError, clearError } = ErrorSlice.actions;

export default ErrorSlice.reducer;