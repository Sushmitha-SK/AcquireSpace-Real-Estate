import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    data: []
}

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        listings: (state, { payload }) => {
            state.isLoading = false;
            state.data = payload.data;
        },
        clearListingData(state) {
            state.data = []
        },
        favoriteListings: (state, { payload }) => {
            state.isLoading = false;
            state.data = payload.data;
        }
    }
});

export const { listings, clearListingData, favoriteListings } = listingSlice.actions;

export default listingSlice.reducer;