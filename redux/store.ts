import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import categoryReducer from "@/redux/features/categories/categorySlice";
import { configureStore } from '@reduxjs/toolkit';
import forgotPasswordReducer from "@/redux/features/auth/forgotPasswordSlice";
import campaignsReducer from "@/redux/features/campaigns/campaignsSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        category: categoryReducer,
        cart: cartReducer,
        campaigns: campaignsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(apiSlice.middleware),
        devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
