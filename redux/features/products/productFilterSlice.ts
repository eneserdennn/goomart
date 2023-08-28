import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isFilter: false,
    brandNames: [],
    productName: '',
    filteredList: []
}

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState,
    reducers: {
        setBrandNames: (state, action) => {
            state.brandNames = action.payload;
        },
        addBrandName: (state, action) => {
            // Aynı marka adını tekrar eklememek için kontrol
            if (!state.brandNames.includes(action.payload)) {
                state.brandNames.push(action.payload);
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
        }
    }
})

export const {setBrandNames, addBrandName, productName, isFilter, filteredList} = productFilterSlice.actions;

export default productFilterSlice.reducer;
