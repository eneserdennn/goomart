import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.token = access_token;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
// @ts-ignore
export const selectCurrentUser = (state) => state.auth.user;
// @ts-ignore
export const selectCurrentToken = (state) => state.auth.token;
