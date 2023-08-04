import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Categories } from "@/redux/types";

const devServerIp = process.env.devServerIp || 'https://ecomm.spookyorange.com';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${devServerIp}/category` }),
    endpoints: (builder) => ({
        getCategories: builder.query<Categories, void>({
            query: () => '/',
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
