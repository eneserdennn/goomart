import { apiSlice } from "@/redux/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/category`,
            keepUnusedDataFor: 5,
        }),
        getCategoriesById: builder.query({
            query: (id) => `/category/${id}`,
        }),
        getSubCategoriesById: builder.query({
            query: (id) => `/sub-category/${id}`,
        }),
        allProductsByCategoryId: builder.query({
            query: (id) => `/category/all-products/${id}`,
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoriesByIdQuery,
    useGetSubCategoriesByIdQuery,
    useAllProductsByCategoryIdQuery,

} = categoriesApiSlice;
