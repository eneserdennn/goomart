import { apiSlice } from "@/redux/api/apiSlice";

export const couponApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      // @ts-ignore
      query: () => `/gift-coupon/my-active-coupons`,
    }),
  }),
});

export const { useGetCouponsQuery } = couponApiSlice;
