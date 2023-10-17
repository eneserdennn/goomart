import { apiSlice } from "@/redux/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdvancedQuery: builder.query({
      // @ts-ignore
      query: (params) => ({
        url: `/product/query`,
        params,
      }),
    }),
    getProductsByProductId: builder.query({
      // @ts-ignore
      query: (id) => `/product/${id}`,
    }),
    getProductsBySubCategoryId: builder.query({
      // @ts-ignore
      query: (id) => `/sub-category/all-products/${id}/?lang=${language}`,
    }),
    getProductsListWithCampaign: builder.query({
      // @ts-ignore
      query: (id) => ({
        url: `/custom-product-list/${id}?lang=tr`,
      }),
    }),
    getProductTypeById: builder.query({
      // @ts-ignore
      query: (id) => `/product-type/${id}`,
    }),
    getMyFavoriteProducts: builder.query({
      // @ts-ignore
      query: () => `/user/my-favorites`,
    }),
    addProductToFavorite: builder.mutation({
      // @ts-ignore
      query: ({ productId }) => ({
        url: `/user/add-to-favorites`,
        method: "POST",
        body: {
          productId: productId,
        },
      }),
    }),
    removeProductFromFavorite: builder.mutation({
      // @ts-ignore
      query: ({ productId }) => ({
        url: `/user/remove-from-favorites`,
        method: "POST",
        body: {
          productId: productId,
        },
      }),
    }),
    getACustomProductList: builder.query({
      // @ts-ignore
      query: () => `/custom-product-list?lang=tr`,
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
  useGetACustomProductListQuery,
} = productsApiSlice;
