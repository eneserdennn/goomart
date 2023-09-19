import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  brand: string;
  name: string;
  description: string;
  image: string;
  mainProductUnitName: string;
  mainProductUnitPrice: number;
  mainProductUnitStock: number;
  productTypeId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  ProductUnits: {
    id: number;
    name: string;
    convertionToMainUnit: number;
    createdAt: string;
    updatedAt: string;
    productId: number;
    archived: boolean;
    archivedAt: string | null;
    isMainUnit: boolean;
  }[];
  discountedPrice: number;
  saleAmount: number;
  quantity: number;
}

interface CartState {
  canOrder: boolean;
  canFreeShip: boolean;
  shipmentFee: number;
  totalPrice: number;
  products: Product[];
  isModalOpen: boolean;
}

const initialState: CartState = {
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
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const index = state.products.findIndex((x) => x.id === productToAdd.id);
      if (index >= 0) {
        // Increment the quantity by 1
        state.products[index].quantity += 1;
      } else {
        // Add the product to the cart with a quantity of 1
        state.products.push({ ...productToAdd, quantity: 1 });
      }
      // Adjust total price
      state.totalPrice += productToAdd.mainProductUnitPrice;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((x) => x.id === productId);

      if (productIndex === -1) return;

      if (state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        state.totalPrice -= state.products[productIndex].mainProductUnitPrice;
      } else {
        state.totalPrice -=
          state.products[productIndex].mainProductUnitPrice *
          state.products[productIndex].quantity;
        state.products.splice(productIndex, 1);
      }

      const totalQuantity = state.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      if (totalQuantity === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    setCartFromLocalStorage: (state) => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.products = JSON.parse(cart);

        // Calculate totalPrice based on the products restored from localStorage
        state.totalPrice = state.products.reduce((acc, product) => {
          return acc + product.mainProductUnitPrice * product.quantity;
        }, 0);
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

export const selectCart = (state: { cart: CartState }) => state.cart;

export default cartSlice.reducer;
