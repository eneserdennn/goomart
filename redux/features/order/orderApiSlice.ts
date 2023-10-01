import { apiSlice } from "@/redux/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      // @ts-ignore
      query: ({ pageNo = 0, pageSize = 5, from, to }) => {
        let url = `/order/?pageNo=${pageNo}&pageSize=${pageSize}`;
        if (from) url += `&from=${from}`;
        if (to) url += `&to=${to}`;
        return url;
      },
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
    placeAnOrder: builder.mutation({
      // @ts-ignore
      query: (data) => ({
        url: "order/checkout",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query({
      // @ts-ignore
      query: (id) => `/order/${id}?lang=tr`,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCheckCartMutation,
  useCheckOutMutation,
  useCouponAttemptMutation,
  usePlaceAnOrderMutation,
  useGetOrderQuery,
} = orderApiSlice;
