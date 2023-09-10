import { apiSlice } from "@/redux/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdvancedQuery: builder.query({
      query: (params) => ({
        url: `/product/query`,
        params,
      }),
    }),
    getProductsByProductId: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getProductsBySubCategoryId: builder.query({
      query: (id) => `/sub-category/all-products/${id}`,
    }),
    getProductsListWithCampaign: builder.query({
      query: (id) => ({
        url: `/custom-product-list/${id}?lang=tr`,
      }),
    }),
    getProductTypeById: builder.query({
      query: (id) => `/product-type/${id}`,
    }),
    getMyFavoriteProducts: builder.query({
      query: () => `/user/my-favorites`,
    }),
    addProductToFavorite: builder.mutation({
      query: ({ productId }) => ({
        url: `/user/add-to-favorites`,
        method: "POST",
        body: {
          productId: productId,
        },
      }),
    }),
    removeProductFromFavorite: builder.mutation({
      query: ({ productId }) => ({
        url: `/user/remove-from-favorites`,
        method: "POST",
        body: {
          productId: productId,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsAdvancedQueryQuery,
  useGetProductsByProductIdQuery,
  useGetProductsBySubCategoryIdQuery,
  useGetProductsListWithCampaignQuery,
  useGetProductTypeByIdQuery,
  useGetMyFavoriteProductsQuery,
  useAddProductToFavoriteMutation,
  useRemoveProductFromFavoriteMutation,
} = productsApiSlice;
