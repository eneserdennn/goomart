import { apiSlice } from "@/redux/api/apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      // @ts-ignore
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFaqQuery } = faqApiSlice;
