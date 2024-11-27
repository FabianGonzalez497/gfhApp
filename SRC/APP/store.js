import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../SERVICES/shopServices';
import { receiptApi } from '../SERVICES/receiptsService';
import { authApi } from '../SERVICES/authService';
import shopReducer from '../FEATURES/Shop/shopSlice';
import cartReducer from '../FEATURES/CART/cartSlice';
import authReducer from '../FEATURES/AUTH/authSlice';
import { userApi } from '../SERVICES/userServices';

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptApi.reducerPath]: receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(receiptApi.middleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware)
});
