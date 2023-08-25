import {apiSlice} from "@/redux/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/order',
        }),
        // post method with check your cart
        checkCart: builder.mutation({
            query: (data) => ({
                url: '/order/check-your-cart',
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
        //coupon-attempt
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
