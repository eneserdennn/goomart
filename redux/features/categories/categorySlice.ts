import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductType {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface ISubCategory {
    id: string;
    name: string;
    description: string;
    image: string;
    ProductType: IProductType[];
}
export interface CategoryState {
    productType: IProductType[];
    selectedProductType: IProductType | null;
    selectedSubCategory: ISubCategory | null;
}

const initialState: CategoryState = {
    productType: [],
    selectedProductType: { id: "", name: "", description: "", image: "" },
    selectedSubCategory: { id: "", name: "", description: "", image: "", ProductType: [] }
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setProductType: (state, action: PayloadAction<IProductType[]>) => {
            state.productType = action.payload;
        },
        setSelectedProductType: (state, action: PayloadAction<IProductType>) => {
            state.selectedProductType = action.payload;
        },
        setSelectedSubCategory: (state, action: PayloadAction<ISubCategory>) => {
            state.selectedSubCategory = action.payload;
        },
    },
});

export const { setProductType, setSelectedProductType, setSelectedSubCategory } = categorySlice.actions;
export default categorySlice.reducer;
