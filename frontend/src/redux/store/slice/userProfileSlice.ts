import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    data: [],
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        userProfile: (state: any, action: any) => {
            state.data = action.payload;
        },
        clearUserProfile(state) {
            state.data = []
        },

    }
})

export const { userProfile, clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;