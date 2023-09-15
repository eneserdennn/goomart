import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canOrder: false,
  canFreeShip: false,
  shipmentFee: 5,
  totalPrice: 0,
  products: [],
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
        state.products[index].quantity += product.quantity;
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
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
