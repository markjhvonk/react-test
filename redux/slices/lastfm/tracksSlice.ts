

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_KEY } from '../../../constants';

// Define a type for the slice state
interface artistsState {
    tracks: Array<object>,
    status: string,
    error?: string
}

// Define the initial state using that type
const initialState: artistsState = {
    tracks: [],
    status: 'idle',
    error: undefined
}

interface responseParams {
    query: string,
    limit?: number,
    page?: number
}

export const fetchTracks = createAsyncThunk(
    'tracks/fetch',
    async (params: responseParams, thunkAPI) => {
        const { query, limit, page } = params;
        const passLimit = limit ? limit : 10;
        const passPage = page ? page : 1;
        try {
            const response = await axios.get(API_URL + '?method=track.search&track=' + encodeURIComponent(query) + '&limit=' + passLimit + '&page=' + passPage + '&api_key=' + API_KEY + '&format=json');
            let data = await response.data.results.trackmatches.track;
            console.log(data);
            if (response.status === 200) {
                console.log(data);
                if (data.length > 0) {
                    console.log(data);
                    console.log(Array.isArray(data))
                    // Put single tracks in array
                    if (!Array.isArray(data)) {
                        const singleTrack = data;
                        data = [];
                        data.push(singleTrack);
                    }
                    // Add ids to tracks since they are missing
                    data.map((track: any) => {
                        console.log(track)
                        track.id = encodeURIComponent(track.name + '+' + track.artist);
                        return track;
                    });
                    console.log(data);
                }
                console.log(data);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response);
        }
    },
);

export const tracksSlice = createSlice({
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
        [fetchTracks.fulfilled]: (state: any, action: any) => {
            state.status = 'success';
            state.tracks = action.payload;
            return state;
        },
        // @ts-ignore
        [fetchTracks.rejected]: (state: any, action: any) => {
            state.status = 'error';
            state.error = action.error;
            return state;
        },
        // @ts-ignore
        [fetchTracks.pending]: (state: any) => {
            state.status = 'loading';
        },
    }
})

export const { clearState } = tracksSlice.actions;
export const selectTracks = (state: any) => { return { tracks: state.tracks, status: state.status } };
