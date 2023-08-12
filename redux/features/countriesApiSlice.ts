import { apiSlice} from "@/redux/api/apiSlice";

export const countriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => `/country`,
        })
    }),
});

export const { useGetCountriesQuery } = countriesApiSlice;
