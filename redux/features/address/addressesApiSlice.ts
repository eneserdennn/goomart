import { apiSlice } from "@/redux/api/apiSlice";

export const addressesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyAddresses: builder.query({
            query: () => `/address/my-addresses`,
            providesTags: ['Address'],
        }),
        getAddressById: builder.query({
            query: (id) => `/address/${id}`,
        }),
        createAddress: builder.mutation({
            query: (body) => ({
                url: `/address`,
                method: "POST",
                body,
            }),
            invalidatesTags: ['Address'],
        }),
        setDefaultAddress: builder.mutation({
            query: (id) => ({
                url: `/address/set-default/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['Address'],
        }),
        archiveAnAddress: builder.mutation({
            query: (id) => ({
                url: `/address/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Address'],
        }),
        updateAnAddress: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/address/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ['Address'],
        }),
    })
})


export const {
    useGetMyAddressesQuery,
    useGetAddressByIdQuery,
    useCreateAddressMutation,
    useSetDefaultAddressMutation,
    useArchiveAnAddressMutation,
    useUpdateAnAddressMutation,
} = addressesApiSlice;
