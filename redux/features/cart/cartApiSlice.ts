import { apiSlice } from "@/redux/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart/get-cart",
    }),
    addToCart: builder.mutation({
      query: ({ productId, productUnitId, quantityInProductUnit }) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: {
          productId: productId,
          productUnitId: productUnitId,
          quantityInProductUnit: 1,
        },
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ productId, productUnitId, quantityInProductUnit }) => ({
        url: "/cart/remove-from-cart",
        method: "POST",
        body: {
          productId: productId,
          productUnitId: productUnitId,
          quantityInProductUnit: 1,
        },
      }),
    }),
    deleteWholeProductFromCart: builder.mutation({
      query: () => ({
        url: "/cart/kill-cart",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useDeleteWholeProductFromCartMutation,
} = cartApiSlice;
