import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },

        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },

        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },

        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },

        // Action to hydrate auth from localStorage on app initialization
        hydrateAuth(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.token !== null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;