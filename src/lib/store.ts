import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './slices/loading.slice';
import errorReducer from './slices/error.slice';
import successReducer from './slices/success.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            loading: loadingReducer,
            error: errorReducer,
            success: successReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']