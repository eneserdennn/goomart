import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface UserState {
    email: string;
    name: string;
    surname: string;
}

const initialState: UserState = {
    email: '',
    name: '',
    surname: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
        }
    }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

