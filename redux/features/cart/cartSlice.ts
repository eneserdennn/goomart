import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canOrder: false,
  canFreeShip: false,
  shipmentFee: 5,
  totalPrice: 0,
  products: [],
  isModalOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      // add product to cart and save to local storage
      const product = action.payload;
      const index = state.products.findIndex((x) => x.id === product.id);
      if (index >= 0) {
        state.products[index].quantity += 1;
      } else {
        state.products.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeProductFromCart: (state, action) => {
      // remove product from cart and save to local storage
      const productId = action.payload;
      const index = state.products.findIndex((x) => x.id === productId);
      if (index >= 0) {
        state.products.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    setCartFromLocalStorage: (state) => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.products = JSON.parse(cart);
      }
    },
    modalToggle: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  setCartFromLocalStorage,
  modalToggle,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
