import {apiSlice} from "@/redux/api/apiSlice";

export const sliderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSlider: builder.query({
            query: () => ({
                url: '/slider/by-activeness?active=active',
                method: 'GET'
            })
        })
    })
})

export const {useGetSliderQuery} = sliderApiSlice
