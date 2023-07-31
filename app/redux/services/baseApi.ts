import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecomm.spookyorange.com' }),
    endpoints: () => ({}),
})