import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: string;
    isAdmin: boolean;
}

const initialState = {
    value: {
        isAuth: false,
        username: '',
        uid: '',
        isAdmin: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    uid: "asdasdasfsa213123",
                    isAdmin: false
                }
            }
        }
    }
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;