import { baseApi } from "@/app/redux/services/baseApi";

interface Product {
    id: number;
    brand: string;
    name: string;
    description: string;
    image: string;
    mainProductUnitName: string;
    mainProductUnitPrice: number;
    mainProductUnitStock: number;
    reservedMainUnitStock: number;
    productTypeId: number;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string | null;
}

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'product',
            providesTags: ['Product']
        }),
    }),
    overrideExisting: false,
})

export const { useGetProductsQuery } = productsApi;

