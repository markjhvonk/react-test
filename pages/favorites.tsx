import { useEffect } from 'react';
//@ts-ignore
import type { NextPage } from 'next/app';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '../redux/slices/favorites/favoritesSlice';

import Layout from '../components/layout';
import TrackList from '../components/trackList';
import SearchTracks from '../components/searchTracks';
import styled from 'styled-components';

const FavoriteHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Favorites: NextPage = () => {

    const dispatch = useDispatch();
    const { value } = useSelector(selectFavorites);
    const favoriteTracks = value.map((favorite) => favorite.track);
    
    useEffect(() => {
        dispatch(selectFavorites);
    }, []);
    
    console.log(favoriteTracks)
    return (
        <>
            <Head>
                <title>Favorites</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                {favoriteTracks &&
                    <>
                        <FavoriteHeader>
                            <h1>Favorites</h1>
                            <SearchTracks />
                        </FavoriteHeader>
                        <TrackList tracks={favoriteTracks} album={''} />
                    </>
                }
            </Layout>
        </>
    )
}

export default Favorites;
