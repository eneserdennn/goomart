import { createSlice } from '@reduxjs/toolkit';

export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        showModal: false,
        inputValue: "",
        appliedCoupon: null,
        wrongCoupon: false,
        usableCampaigns: [],
        allCampaigns: []
    },
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setAppliedCoupon: (state, action) => {
            state.appliedCoupon = action.payload;
        },
        setWrongCoupon: (state, action) => {
            state.wrongCoupon = action.payload;
            state.inputValue = "";
        },
        setUsableCampaigns: (state, action) => {
            state.usableCampaigns = action.payload;
        },
        setAllCampaigns: (state, action) => {
            state.allCampaigns = action.payload;
        }
    },
});

export const { setShowModal, setInputValue, setAppliedCoupon, setWrongCoupon, setUsableCampaigns, setAllCampaigns } = campaignsSlice.actions;

export const selectCampaigns = state => state.campaigns;

export default campaignsSlice.reducer;
