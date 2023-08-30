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
            query: ({id, params}) => ({
                url: `/category/all-products/${id}`,
                params,
            })
        }),
        searchInAllProducts: builder.query({
            query: ({params}) => ({
                url: `/category/search-products/`,
                params: {
                    search: params.search,
                }
            })
        })
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoriesByIdQuery,
    useGetSubCategoriesByIdQuery,
    useAllProductsByCategoryIdQuery,
    useSearchInAllProductsQuery

} = categoriesApiSlice;
