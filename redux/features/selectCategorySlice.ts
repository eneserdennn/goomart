import { createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CategoryState {
    id: number;
    name: string;
    description: string;
    order: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
    SubCategory: SubCategoryState[];
}

export interface SubCategoryState {
    id: number;
    name: string;
    description: string;
    order: number;
    image: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
    ProductType: ProductTypeState[];
}

export interface ProductTypeState {
    id: number;
    name: string;
    description: string;
    image: string;
    subCategoryId: number;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
}

const initialState: CategoryState[] = [];

export const selectCategorySlice = createSlice({
    name: "selectCategory",
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            return action.payload;
        },
        selectSubCategory: (state, action) => {
            return action.payload;
        },
    },
});

export const { selectCategory, selectSubCategory } = selectCategorySlice.actions;

export const selectSelectedCategory = (state: RootState) => state.selectCategory;

export default selectCategorySlice.reducer;
