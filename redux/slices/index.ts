import { combineReducers } from '@reduxjs/toolkit';

import { favoritesSlice } from './favorites/favoritesSlice';
import { albumsSlice } from './lastfm/albumsSlice';
import { albumDetailsSlice } from './lastfm/albumDetailsSlice';

const rootReducer = combineReducers({
    favorites: favoritesSlice.reducer,
    albums: albumsSlice.reducer,
    albumDetails: albumDetailsSlice.reducer,
    //  Add additional reducers here
});

export default rootReducer;