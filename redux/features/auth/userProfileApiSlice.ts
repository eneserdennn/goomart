import { apiSlice } from "@/redux/api/apiSlice";

export const userProfileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/user/profile`,
        })
    })
});

export const { useGetProfileQuery } = userProfileApiSlice;