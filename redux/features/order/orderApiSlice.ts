import { apiSlice } from "@/redux/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      // @ts-ignore
      query: () => "/order",
    }),
    checkCart: builder.mutation({
      // @ts-ignore
      query: (data) => ({
        url: "/order/check-cart",
        method: "POST",
        body: data,
      }),
    }),
    checkOut: builder.mutation({
      // @ts-ignore
      query: (data) => ({
        url: "/order/checkout",
        method: "POST",
        body: data,
      }),
    }),
    couponAttempt: builder.mutation({
      // @ts-ignore
      query: (data) => ({
        url: "/order/coupon-attempt",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCheckCartMutation,
  useCheckOutMutation,
  useCouponAttemptMutation,
} = orderApiSlice;
