import { combineReducers } from '@reduxjs/toolkit';

// Import reducers
import { favoritesSlice } from './favorites/favoritesSlice';
import { albumsSlice } from './lastfm/albumsSlice';
import { albumDetailsSlice } from './lastfm/albumDetailsSlice';
import { artistsSlice } from './lastfm/artistsSlice';
import { tracksSlice } from './lastfm/tracksSlice';

const rootReducer = combineReducers({
    favorites: favoritesSlice.reducer,
    albums: albumsSlice.reducer,
    albumDetails: albumDetailsSlice.reducer,
    artists: artistsSlice.reducer,
    tracks: tracksSlice.reducer,
    //  Add additional reducers here
});

export default rootReducer;