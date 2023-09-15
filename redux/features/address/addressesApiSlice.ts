import { apiSlice } from "@/redux/api/apiSlice";

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddresses: builder.query({
      // @ts-ignore
      query: () => `/address/my-addresses`,
      providesTags: ["Address"],
    }),
    getAddressById: builder.query({
      // @ts-ignore
      query: (id) => `/address/${id}`,
    }),
    createAddress: builder.mutation({
      // @ts-ignore
      query: (body) => ({
        url: `/address`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    setDefaultAddress: builder.mutation({
      // @ts-ignore
      query: (id) => ({
        url: `/address/set-default/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Address"],
    }),
    archiveAnAddress: builder.mutation({
      // @ts-ignore
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
    updateAnAddress: builder.mutation({
      // @ts-ignore
      query: ({ id, ...body }) => ({
        url: `/address/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetMyAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useSetDefaultAddressMutation,
  useArchiveAnAddressMutation,
  useUpdateAnAddressMutation,
} = addressesApiSlice;
