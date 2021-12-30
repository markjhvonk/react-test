import { combineReducers } from '@reduxjs/toolkit';

import { favoritesSlice } from './favorites/favoritesSlice';
import { albumsSlice } from './lastfm/albumsSlice';
import { albumDetailsSlice } from './lastfm/albumDetailsSlice';
import { artistsSlice } from './lastfm/artistsSlice';

const rootReducer = combineReducers({
    favorites: favoritesSlice.reducer,
    albums: albumsSlice.reducer,
    albumDetails: albumDetailsSlice.reducer,
    artists: artistsSlice.reducer,
    //  Add additional reducers here
});

export default rootReducer;