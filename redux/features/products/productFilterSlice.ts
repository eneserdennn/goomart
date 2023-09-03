import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFilter: false,
    brandNames: [],
    productName: '',
    filteredList: [],
    productTypes: [],
    categoryId: null,
}

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState,
    reducers: {
        setBrandNames: (state, action) => {
            state.brandNames = action.payload;
        },
        addBrandName: (state, action) => {
            if (!state.brandNames?.includes(action.payload)) {
                state.brandNames?.push(action.payload);
            }
        },
        productName: (state, action) => {
            state.productName = action.payload;
        },
        isFilter: (state, action) => {
            state.isFilter = action.payload;
        },
        filteredList: (state, action) => {
            state.filteredList = action.payload;
        },
        setProductTypes: (state, action) => {
            state.productTypes = action.payload;
        },
        addProductType: (state, action) => {
            if (!state.productTypes.includes(action.payload)) {
                state.productTypes.push(action.payload);
            }
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        }
    }
})

export const {
    setBrandNames,
    addBrandName,
    productName,
    isFilter,
    filteredList,
    setProductTypes,
    addProductType,
    setCategoryId
} = productFilterSlice.actions;

export const selectBrandNames = (state) => state.productFilter.brandNames;
export const selectProductName = (state) => state.productFilter.productName;
export const selectIsFilter = (state) => state.productFilter.isFilter;
export const selectFilteredList = (state) => state.productFilter.filteredList;
export const selectProductTypes = (state) => state.productFilter.productTypes;
export const selectCategoryId = (state) => state.productFilter.categoryId;


export default productFilterSlice.reducer;
