

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_KEY } from '../../../constants';

// Define a type for the slice state
interface albumDetailsState {
    albumDetails: object,
    status: string,
    error?: string
}

// Define the initial state using that type
const initialState: albumDetailsState = {
    albumDetails: {},
    status: 'idle',
    error: undefined
}

interface responseParams {
    artist: string,
    album: string
}

export const fetchAlbumDetails = createAsyncThunk(
    'albumDetails/fetch',
    async (data: responseParams, thunkAPI) => {
        const {artist, album} = data;
        try {
            const response = await axios.get(API_URL + '?method=album.getinfo&artist=' + artist + '&album=' + album + '&api_key=' + API_KEY + '&format=json');
            let data = await response.data.album;
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

export const albumDetailsSlice = createSlice({
    name: 'albumDetails',
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
        [fetchAlbumDetails.fulfilled]: (state: any, action: any) => {
            state.status = 'success';
            state.albumDetails = action.payload;
            return state;
        },
        // @ts-ignore
        [fetchAlbumDetails.rejected]: (state: any, action: any) => {
            state.status = 'error';
            state.error = action.error;
            return state;
        },
        // @ts-ignore
        [fetchAlbumDetails.pending]: (state: any) => {
            state.status = 'loading';
        },
    }
})

export const { clearState } = albumDetailsSlice.actions;
export const selectAlbumDetails = (state: any) => state.albumDetails;
