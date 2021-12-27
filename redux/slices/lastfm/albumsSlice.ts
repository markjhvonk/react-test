

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {API_URL, API_KEY} from '../../../constants';

// Define a type for the slice state
interface albumsState {
    albums: Array<Object>,
    status: string,
    error?: string
}

// Define the initial state using that type
const initialState: albumsState = {
    albums: [],
    status: 'idle',
    error: undefined
}

export const fetchAlbums = createAsyncThunk(
    'albums/fetch',
    async (artist: string, thunkAPI) => {
        try {
            const response = await axios.get(API_URL + '?method=artist.gettopalbums&artist=' + artist + '&api_key=' + API_KEY + '&format=json');
            let data = await response.data.topalbums.album;
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response);
        }
    },
);

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        clearState(state) {
            state.status = 'idle';
            state.error = undefined;
            return state;
        },
        default(state) { return state }
    },
    extraReducers: {
        // omit posts loading reducers
        // @ts-ignore
        [fetchAlbums.fulfilled]: (state: any, action: any) => {
            state.status = 'success';
            state.albums = action.payload;
            return state;
        },
        // @ts-ignore
        [fetchAlbums.rejected]: (state: any, action: any) => {
            state.status = 'error';
            state.error = action.error;
            return state;
        },
        // @ts-ignore
        [fetchAlbums.pending]: (state: any) => {
            state.status = 'loading';
        },
    }
})

export const { clearState } = albumsSlice.actions;
export const selectAlbums = (state: any) => state.albums;
