import { useEffect } from 'react';
//@ts-ignore
import type { NextPage } from 'next/app';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '../redux/slices/favorites/favoritesSlice';

import Layout from '../components/layout';
import TrackList from '../components/trackList';

const Favorites: NextPage = () => {

    const dispatch = useDispatch();
    const { value } = useSelector(selectFavorites);
    const favoriteTracks = value.map((favorite) => favorite.track);
    
    useEffect(() => {
        dispatch(selectFavorites);
    }, []);

    return (
        <>
            <Head>
                <title>Favorites</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                {favoriteTracks &&
                    <>
                        <h1>Favorites</h1>
                        <TrackList tracks={favoriteTracks} album={''} />
                    </>
                }
            </Layout>
        </>
    )
}

export default Favorites;
