import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTracks, selectTracks } from '../../redux/slices/lastfm/tracksSlice';
import { selectFavorites, add, remove } from '../../redux/slices/favorites/favoritesSlice';

import { SearchField } from '../inputs';

interface trackObject {
    id: string,
    name: string,
}

function SearchTracks() {
    const dispatch = useDispatch();

    const { value } = useSelector(selectFavorites);
    dispatch(selectFavorites);

    const { tracks } = useSelector(selectTracks);
    dispatch(selectTracks);
    const [fetchedTracks, setFetchedTracks] = useState<Array<any>>([]);

    const searchTracks = (query: string) => {
        if (query !== '') {
            // Only fetch tracks if query has data
            dispatch(fetchTracks({ query, limit: 10 }));
        } else {
            // Else empty list
            setFetchedTracks([]);
        }
    }

    const clickTrack = (track: trackObject) => {
        const status = value.find((t:any) => t.id === track.id) ? true : false;
        if (!status) dispatch(add({ id: track.id, track: track })); // Add favorite track if it's not there yet
        setFetchedTracks([]); // Clear list
    }

    useEffect(() => {
        if (tracks.tracks !== fetchedTracks) {
            // Only set artist if there is a new list
            setFetchedTracks(tracks.tracks);
        } else {
            // Else empty list
            setFetchedTracks([]);
        }
    }, [tracks.tracks]);

    return (
        <SearchField
            inputCallback={(input: string) => { searchTracks(input) }}
            itemCallback={clickTrack}
            placeholder="Search for tracks to add"
            dropdownData={fetchedTracks} />
    );
}

SearchTracks.propTypes = {
    //...
}

export default SearchTracks;