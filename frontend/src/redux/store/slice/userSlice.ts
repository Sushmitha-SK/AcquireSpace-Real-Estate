import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    isLoading: false,
    data: [],
    email: null,
    password: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state: any, action: PayloadAction<{ token: string; userId: string; }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        clearLogin(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.data = [];
        },
        loginCredentials: (state: any, action: PayloadAction<{ email: string; password: string; }>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },

    }
})

export const { login, clearLogin, loginCredentials } = userSlice.actions;

export default userSlice.reducer;