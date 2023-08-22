import {apiSlice} from "@/redux/api/apiSlice";

export const termsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTerms: builder.query({
            query: () => ({
                url: '/aggreement',
                method: 'GET'
            })
        })
    })
})

export const {useGetTermsQuery} = termsApiSlice;

