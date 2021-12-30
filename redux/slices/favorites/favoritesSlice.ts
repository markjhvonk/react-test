import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface favoriteTrack { id: number, track: object }
interface favoriteState {
    value: favoriteTrack[]
}

const initialState: favoriteState = {
    value: [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        add: (state, action: any) => {
            state.value.push(action.payload);
        },
        remove: (state, action) => {
            const index = state.value.findIndex(t => t.id === action.payload);
            state.value.splice(index, 1);
        }
    }
});

export const { add, remove } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
