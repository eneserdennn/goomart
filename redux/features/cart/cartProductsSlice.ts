import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for the product and state.

interface ProductUnit {
  id: number;
  name: string;
  convertionToMainUnit: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  archived: boolean;
  archivedAt: string | null;
  isMainUnit: boolean;
}

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
  ProductUnits: ProductUnit[];
}

interface CartProduct {
  productId: number;
  unitId: number;
  quantityInProductUnit: number;
  mainProductUnitDiscountAmount: number;
  calculatedPrice: number;
  productItself: Product;
  productUnitItself: ProductUnit;
}

interface CartProductsState {
  canOrder: boolean;
  canFreeShip: boolean;
  shipmentFee: number;
  totalPrice: number;
  products: CartProduct[];
}

const initialState: CartProductsState = {
  canOrder: false,
  canFreeShip: false,
  shipmentFee: 0,
  totalPrice: 0,
  products: [],
};

const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCartProducts: (state, action: PayloadAction<CartProductsState>) => {
      return action.payload; // Simply replace the current state with the received state
    },
  },
});

export const { setCartProducts } = cartProductsSlice.actions;

export const selectCartProducts = (state: any) => state.cartProducts;
export default cartProductsSlice.reducer;
