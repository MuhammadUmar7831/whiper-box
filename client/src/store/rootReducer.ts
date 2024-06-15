import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading.slice';
import errorReducer from './slices/error.slice';
import successReducer from './slices/success.slice';

const rootReducer = combineReducers({
    loading: loadingReducer,
    success: successReducer,
    error: errorReducer
});

export default rootReducer;
