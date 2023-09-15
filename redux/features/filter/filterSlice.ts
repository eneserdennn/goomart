import { createSlice } from "@reduxjs/toolkit";

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
  brands: [] as any[],
  selectedBrands: [] as any[],
  filteredProductWithBrands: [] as any[],
  sortBy: "default" as string,
  filteredProductCount: 0 as number,
  isSearched: false as boolean,
  filteredProductTypes: [] as any[],
  saleToggle: false as boolean,
};

const filterSlice = createSlice({
  name: "filter",
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
    },
    addBrands: (state, action) => {
      if (!state.brands.includes(action.payload)) {
        state.brands.push(action.payload);
      }
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    removeSelectedBrand: (state, action) => {
      const index = state.selectedBrands.indexOf(action.payload);
      if (index !== -1) {
        state.selectedBrands.splice(index, 1);
      }
    },
    addFilteredProductWithBrands: (state, action) => {
      state.filteredProductWithBrands.push(action.payload);
    },
    setFilteredProductWithBrands: (state, action) => {
      state.filteredProductWithBrands = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilteredProductCount: (state, action) => {
      state.filteredProductCount = action.payload;
    },
    isSearched: (state, action) => {
      state.isSearched = action.payload;
    },
    setFilteredProductTypes: (state, action) => {
      state.filteredProductTypes = action.payload;
    },
    setSaleToggle: (state, action) => {
      state.saleToggle = action.payload;
    },
  },
});

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
  addSelectedBrand,
  addBrands,
  removeSelectedBrand,
  setBrands,
  addFilteredProductWithBrands,
  setFilteredProductWithBrands,
  setSortBy,
  setFilteredProductCount,
  isSearched,
  setFilteredProductTypes,
  setSaleToggle,
} = filterSlice.actions;

// @ts-ignore
export const selectCategories = (state) => state.filter.categories;
// @ts-ignore
export const selectSelectedCategory = (state) => state.filter.selectedCategory;
// @ts-ignore
export const selectSubCategories = (state) => state.filter.subCategories;
// @ts-ignore
export const selectSelectedSubCategory = (state) =>
  state.filter.selectedSubCategory;
// @ts-ignore
export const selectProductTypes = (state) => state.filter.productTypes;
// @ts-ignore
export const selectSelectedProductType = (state) =>
  state.filter.selectedProductType;
// @ts-ignore
export const selectProducts = (state) => state.filter.products;
// @ts-ignore
export const selectIsFiltered = (state) => state.filter.isFiltered;
// @ts-ignore
export const selectBrands = (state) => state.filter.brands;
// @ts-ignore
export const selectSelectedBrands = (state) => state.filter.selectedBrands;
// @ts-ignore
export const selectFilteredProductWithBrands = (state) =>
  state.filter.filteredProductWithBrands;
// @ts-ignore
export const selectSortBy = (state) => state.filter.sortBy;
// @ts-ignore
export const selectFilteredProductCount = (state) =>
  state.filter.filteredProductCount;
// @ts-ignore
export const selectIsSearched = (state) => state.filter.isSearched;
// @ts-ignore
export const selectFilteredProductTypes = (state) =>
  state.filter.filteredProductTypes;
// @ts-ignore
export const selectSaleToggle = (state) => state.filter.saleToggle;

export default filterSlice.reducer;
