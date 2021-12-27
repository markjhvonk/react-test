import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface favoriteState {
    value: { id: number, name: string }[]
}

const initialState: favoriteState = {
    value: [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        add: (state) => {
            state.value.push({id: 1, name: 'test'});
        },
        remove: (state) => {
            state
        }
    }
});

export const { add, remove } = favoritesSlice.actions;

export const selectCount = (state: RootState) => state.favorites.value;

export default favoritesSlice.reducer;
