import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import campaignsReducer from "@/redux/features/campaigns/campaignsSlice";
import cartProductsReducer from "@/redux/features/cart/cartProductsSlice";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "@/redux/features/categories/categorySlice";
import checkOutReducer from "./features/checkout/checkOutSlice";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "@/redux/features/filter/filterSlice";
import forgotPasswordReducer from "@/redux/features/auth/forgotPasswordSlice";
import orderReducer from "@/redux/features/order/orderSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    category: categoryReducer,
    cart: cartReducer,
    campaigns: campaignsReducer,
    filter: filterReducer,
    cartProducts: cartProductsReducer,
    order: orderReducer,
    checkOut: checkOutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
