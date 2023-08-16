import { apiSlice } from "@/redux/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductsAdvancedQuery: builder.query({
            query: (params) => ({
                url: `/product/query`,
                params,
            })
        }),
        getProductsByProductId: builder.query({
            query: (id) => `/product/${id}`

        }),   
        getProductsBySubCategoryId: builder.query({
            query: (id) => `/sub-category/all-products/${id}` 
        }),
    })
});

export const { useGetProductsAdvancedQueryQuery, useGetProductsByProductIdQuery ,useGetProductsBySubCategoryIdQuery } = productsApiSlice;

