import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../SERVICES/shopServices';
import shopReducer from '../FEATURES/Shop/shopSlice';

export const store = configureStore({
    reducer: {
        [shopApi.reducerPath]: shopApi.reducer,
        shopReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});
