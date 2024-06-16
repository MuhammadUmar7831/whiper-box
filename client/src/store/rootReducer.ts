import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading.slice';
import errorReducer from './slices/error.slice';
import successReducer from './slices/success.slice';
import userReducer from './slices/user.slice';

const rootReducer = combineReducers({
    loading: loadingReducer,
    success: successReducer,
    error: errorReducer,
    user: userReducer
});

export default rootReducer;
