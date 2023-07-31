import { baseApi } from "@/app/redux/services/baseApi";

interface ProductType {
    id: number;
    name: string;
    description: string;
    image: string;
}

interface SubCategory {
    id: number;
    name: string;
    description: string;
    image: string;
    ProductType: ProductType[];
}

interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    SubCategory: SubCategory[];
}

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'category',
        }),
    }),
    overrideExisting: false,
})

export const { useGetCategoriesQuery } = categoriesApi;
