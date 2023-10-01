import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderProductUnit {
  id: number;
  name: string;
  convertionToMainUnitRate: number;
  orderProductId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
}

interface OrderProduct {
  id: number;
  name: string;
  quantityAsMainUnit: number;
  priceOfMainUnit: number;
  absolutePrice: number;
  productId: number;
  productUnitId: number;
  originalPriceOfMainUnit: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
  OrderProductUnit: OrderProductUnit;
}

interface Order {
  id: number;
  transactionDate: string;
  orderStatus: string;
  shippingFee: number;
  totalPrice: number;
  totalDiscount: number;
  customerId: number;
  deliveryAddressId: number;
  invoiceAddressId: number;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
  OrderProduct: OrderProduct[];
  Invoice: null | object;
}

interface OrderState {
  order: Order | null;
  orders: Order[];
  from: string | null;
  to: string | null;
  pageNo: number;
  pageSize: number;
}

const initialState: OrderState = {
  order: null,
  orders: [],
  from: null,
  to: null,
  pageNo: 0,
  pageSize: 5,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order | null>) => {
      state.order = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setFrom: (state, action: PayloadAction<string | null>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string | null>) => {
      state.to = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setOrder, setOrders, setFrom, setTo, setPageNo, setPageSize } =
  orderSlice.actions;

export const selectOrder = (state: { order: OrderState }) => state.order.order;
export const selectOrders = (state: { order: OrderState }) =>
  state.order.orders;
export const selectFrom = (state: { order: OrderState }) => state.order.from;
export const selectTo = (state: { order: OrderState }) => state.order.to;
export const selectPageNo = (state: { order: OrderState }) =>
  state.order.pageNo;
export const selectPageSize = (state: { order: OrderState }) =>
  state.order.pageSize;

export default orderSlice.reducer;
