import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordState {
    email: string;
    verificationCode: string;
    newPassword: string;
}

const initialState: ForgotPasswordState = {
    email: '',
    verificationCode: '',
    newPassword: ''
};

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setVerificationCode: (state, action: PayloadAction<string>) => {
            state.verificationCode = action.payload;
        },
        setNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload;
        },
        resetForgotPasswordState: (state) => {
            state.email = '';
            state.verificationCode = '';
            state.newPassword = '';
        }
    }
});

export const { setEmail, setVerificationCode, setNewPassword, resetForgotPasswordState } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
