import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import forgotPasswordReducer from "@/redux/features/auth/forgotPasswordSlice";
import categoryReducer from "@/redux/features/categories/categorySlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        category: categoryReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(apiSlice.middleware),
        devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
