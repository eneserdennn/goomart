import { apiSlice } from "@/redux/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      // @ts-ignore
      query: () => "/cart/get-cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      // @ts-ignore
      query: ({ productId, productUnitId, quantityInProductUnit }) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: {
          productId: productId,
          productUnitId: productUnitId,
          quantityInProductUnit: 1,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      // @ts-ignore
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
      // @ts-ignore
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
