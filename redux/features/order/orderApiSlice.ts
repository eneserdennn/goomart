import {apiSlice} from "@/redux/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/order',
        }),
        checkCart: builder.mutation({
            query: (data) => ({
                url: '/order/check-cart',
                method: 'POST',
                body: data
            })
        }),
        checkOut: builder.mutation({
            query: (data) => ({
                url: '/order/checkout',
                method: 'POST',
                body: data
            })
        }),
        couponAttempt: builder.mutation({
            query: (data) => ({
                url: '/order/coupon-attempt',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useGetOrdersQuery, useCheckCartMutation, useCheckOutMutation, useCouponAttemptMutation} = orderApiSlice
