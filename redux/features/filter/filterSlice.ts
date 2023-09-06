import {createSlice} from "@reduxjs/toolkit";

interface IProductType {
    id: number;
    name: string;
    description: string;
    image: string;
    subCategoryId: number;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string | null;
}

interface ISubCategory {
    id: number;
    name: string;
    description: string;
    order: number;
    image: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string | null;
    ProductType: IProductType[];
}

interface ICategory {
    id: number;
    name: string;
    description: string;
    order: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string | null;
    SubCategory: ISubCategory[];
}

const initialState = {
    isFiltered: false,
    categories: [] as ICategory[],
    selectedCategory: {} as ICategory | null,
    subCategories: [] as ISubCategory[],
    selectedSubCategory: {} as ISubCategory | null,
    productTypes: [] as IProductType[],
    selectedProductType: {} as IProductType | null,
    products: [] as any[],
    selectedBrands: [] as any[],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        isFiltered: (state, action) => {
            state.isFiltered = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSubCategories: (state, action) => {
            state.subCategories = action.payload;
        },
        setSelectedSubCategory: (state, action) => {
            state.selectedSubCategory = action.payload;
        },
        setProductTypes: (state, action) => {
            state.productTypes = action.payload;
        },
        setSelectedProductType: (state, action) => {
            state.selectedProductType = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSelectedBrands: (state, action) => {
            state.selectedBrands = action.payload;
        },
        addSelectedBrand: (state, action) => {
            if (!state.selectedBrands.includes(action.payload)) {
                state.selectedBrands.push(action.payload);
            }
        }
    }
})

export const {
    setCategories,
    setSelectedCategory,
    setSubCategories,
    setSelectedSubCategory,
    setProductTypes,
    setSelectedProductType,
    setProducts,
    isFiltered,
    setSelectedBrands,
    addSelectedBrand
} = filterSlice.actions;

export const selectCategories = (state) => state.filter.categories;
export const selectSelectedCategory = (state) => state.filter.selectedCategory;
export const selectSubCategories = (state) => state.filter.subCategories;
export const selectSelectedSubCategory = (state) => state.filter.selectedSubCategory;
export const selectProductTypes = (state) => state.filter.productTypes;
export const selectSelectedProductType = (state) => state.filter.selectedProductType;
export const selectProducts = (state) => state.filter.products;
export const selectIsFiltered = (state) => state.filter.isFiltered;


export default filterSlice.reducer;

