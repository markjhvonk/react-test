

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_KEY } from '../../../constants';

// Define a type for the slice state
interface artistsState {
    artists: Array<object>,
    status: string,
    error?: string
}

// Define the initial state using that type
const initialState: artistsState = {
    artists: [],
    status: 'idle',
    error: undefined
}

interface responseParams {
    query: string,
    limit?: number,
    page?: number
}

export const fetchArtists = createAsyncThunk(
    'artists/fetch',
    async (params: responseParams, thunkAPI) => {
        const { query, limit, page } = params;
        const passLimit = limit ? limit : 10;
        const passPage = page ? page : 1;
        try {
            const response = await axios.get(API_URL + '?method=artist.search&artist=' + encodeURIComponent(query) + '&limit=' + passLimit + '&page=' + passPage + '&api_key=' + API_KEY + '&format=json');
            let data = await response.data.results.artistmatches.artist;
            if (response.status === 200) {
                if (data.length > 0) {
                    // Add ids to artists because they are lacking
                    data.map((artist: any) => {
                        artist.id = encodeURIComponent(artist.name + '+' + artist.url);
                        return artist;
                    });
                }
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response);
        }
    },
);

export const artistsSlice = createSlice({
    name: 'artists',
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
        [fetchArtists.fulfilled]: (state: any, action: any) => {
            state.status = 'success';
            state.artists = action.payload;
            return state;
        },
        // @ts-ignore
        [fetchArtists.rejected]: (state: any, action: any) => {
            state.status = 'error';
            state.error = action.error;
            return state;
        },
        // @ts-ignore
        [fetchArtists.pending]: (state: any) => {
            state.status = 'loading';
        },
    }
})

export const { clearState } = artistsSlice.actions;
export const selectArtists = (state: any) => { return { artists: state.artists, status: state.status } };
