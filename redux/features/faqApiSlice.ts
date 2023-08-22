import {apiSlice} from "@/redux/api/apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFaq: builder.query({
            query: () => ({
                url: '/faq',
                method: 'GET'
            })
        })
    })
})

export const {useGetFaqQuery} = faqApiSlice

