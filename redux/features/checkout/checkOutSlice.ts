import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface CheckOutState {
  selectedAddress: string;
  selectedCargo: string;
  selectedPayment: string;
  totalCheckoutPrice: number;
}

const initialState: CheckOutState = {
  selectedAddress: "",
  selectedCargo: "",
  selectedPayment: "",
  totalCheckoutPrice: 0,
};

export const checkOutSlice = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.totalCheckoutPrice = action.payload;
    },
    setAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setCargo: (state, action) => {
      state.selectedCargo = action.payload;
    },
    setPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
  },
});

export const { setPrice, setAddress, setCargo, setPayment } =
  checkOutSlice.actions;

export const selectAddress = (state: RootState) =>
  // @ts-ignore
  state.checkOut.selectedAddress;
// @ts-ignore
export const selectCargo = (state: RootState) => state.checkOut.selectedCargo;

export const selectPayment = (state: RootState) =>
  state.checkOut.selectedPayment;

export const selectPrice = (state: RootState) =>
  state.checkOut.totalCheckoutPrice;

export default checkOutSlice.reducer;
