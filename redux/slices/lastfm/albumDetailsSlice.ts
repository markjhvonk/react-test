

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
    album: string,
}

export const fetchAlbumDetails = createAsyncThunk(
    'albumDetails/fetch',
    async (params: responseParams, thunkAPI) => {
        const {artist, album} = params;
        try {
            const response = await axios.get(API_URL + '?method=album.getinfo&artist=' + encodeURIComponent(artist) + '&album=' + encodeURIComponent(album) + '&api_key=' + API_KEY + '&format=json');
            let data = await response.data.album;
            if (response.status === 200) {
                if (data.tracks) {
                    // Put single tracks in array
                    if (!Array.isArray(data.tracks.track)) {
                        const singleTrack = data.tracks.track
                        data.tracks.track = []; 
                        data.tracks.track.push(singleTrack);
                    }
                    // Add ids to tracks because they were lacking, needed for favorite functionality
                    data.tracks.track.map((track: any) => {
                        track.id = encodeURIComponent(track.name + '+' + track.artist);
                        return track;
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
export const selectAlbumDetails = (state: any) => { return { albumDetails: state.albumDetails, status: state.status}};
