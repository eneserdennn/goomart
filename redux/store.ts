import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "@/redux/api/authSlice";
import { categoryApi } from "@/redux/features/categorySlice";
import forgotPasswordReducer from "@/redux/features/forgotPasswordSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        forgotPassword: forgotPasswordReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(categoryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
