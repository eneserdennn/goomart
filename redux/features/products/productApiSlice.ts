import { apiSlice } from "@/redux/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductsAdvancedQuery: builder.query({
            query: (params) => ({
                url: `/product/query`,
                params,
            })
        })
    })
});

export const { useGetProductsAdvancedQueryQuery } = productsApiSlice;

