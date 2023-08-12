import { apiSlice } from "@/redux/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/category`,
            keepUnusedDataFor: 5,
        })
    }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;