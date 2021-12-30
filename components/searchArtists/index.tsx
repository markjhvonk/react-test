import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists, selectArtists } from '../../redux/slices/lastfm/artistsSlice';

import {SearchField} from '../inputs';

interface artistObject {
    id: string,
    name: string,
}

function SearchArtists() {
    const dispatch = useDispatch();
    const { artists } = useSelector(selectArtists);
    dispatch(selectArtists);
    const [fetchedArtists, setFetchedArtists] = useState<Array<any>>([]);

    const searchArtists = (query: string) => {
        if (query !== '') {
            // Only fetch artists if query has data
            dispatch(fetchArtists({ query, limit: 10 }));
        } else {
            // Else empty list
            setFetchedArtists([]);
        }
    }

    const clickArtist = (artist: artistObject) => {
        setFetchedArtists([]); // Clear list
        window.location.href = `/?artist=${artist.name}`; // Redirect with new data
    }

    useEffect(() => {
        if (artists.artists !== fetchedArtists) {
            // Only set artist if there is a new list
            setFetchedArtists(artists.artists);
        } else {
            // Else empty list
            setFetchedArtists([]);
        }
    }, [artists.artists]);

    return (
        <SearchField
            inputCallback={(input: string) => { searchArtists(input) }}
            itemCallback={clickArtist}
            dropdownData={fetchedArtists}
            placeholder="Search for artists" />
    );
}

SearchArtists.propTypes = {
    //...
}

export default SearchArtists;