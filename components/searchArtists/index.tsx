import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists, selectArtists, clearState } from '../../redux/slices/lastfm/artistsSlice';

import {SearchField} from '../inputs';

interface artistObject {
    id: string,
    name: string,
}

function SearchArtists() {
    const dispatch = useDispatch();
    const { artists } = useSelector(selectArtists);
    // const fetchedArtists = artists.artists;
    dispatch(selectArtists);
    const [fetchedArtists, setFetchedArtists] = useState<Array<any>>([]);

    console.log(fetchedArtists)

    useEffect(() => {
        console.log('artists changed', artists)
        // console.log('test', query)
        if (artists.artists !== fetchedArtists) {
            setFetchedArtists(artists.artists);
        } else {
            setFetchedArtists([]);
        }
        // setFetchedArtists()
        // Fetch albums if a new artist was detected
        // if (fetchedArtists !== defaultArtist) dispatch(fetchAlbums(String(selectedArtist)));
    }, [artists.artists]);

    const searchArtists = (query: string) => {
        console.log('test', query)
        if (query !== '') {
            console.log('dispatch')
            dispatch(fetchArtists({ query, limit: 10 }));
        } else {
            setFetchedArtists([]);
            // dispatch(clearState());
        }
    }

    const clickArtist = (artist: artistObject) => {
        console.log(artist.name);
        setFetchedArtists([]);
        // dispatch(clearState());
        window.location.href = `/?artist=${artist.name}`;
    }

    return (
        <SearchField
            inputCallback={(input: string) => { searchArtists(input) }}
            itemCallback={clickArtist}
            dropdownData={fetchedArtists} />
    );
}

SearchArtists.propTypes = {

}

export default SearchArtists;