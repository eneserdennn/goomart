import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
  itemsPrice: string; // Assuming this will be a formatted string
  shippingPrice: string;
  taxPrice: string;
  loading?: boolean;
  isModalOpen?: boolean;
}

const initialState: CartState = {
  cartItems: [],
  itemsPrice: "0.00",
  shippingPrice: "0.00",
  taxPrice: "0.00",
  loading: true,
  isModalOpen: false,
};

const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item: CartItem = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 100
      );

      state.taxPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      Cookies.set("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 100
      );

      state.taxPrice = (Number(state.itemsPrice) * 0.1).toFixed(2);

      Cookies.set("cart", JSON.stringify(state));
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    clearCart(state) {
      state.cartItems = [];
      state.itemsPrice = "0.00";
      state.shippingPrice = "0.00";
      state.taxPrice = "0.00";
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  openModal,
  closeModal,
  hideLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
