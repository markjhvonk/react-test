import { combineReducers } from '@reduxjs/toolkit';

import { favoritesSlice } from './favorites/favoritesSlice';
import { albumsSlice } from './lastfm/albumsSlice';

const rootReducer = combineReducers({
    favorites: favoritesSlice.reducer,
    albums: albumsSlice.reducer,
    //  Add additional reducers here
});

export default rootReducer;