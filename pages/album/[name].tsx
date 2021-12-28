import { useEffect } from 'react';
//@ts-ignore
import { useRouter } from 'next/router'
//@ts-ignore
import type { NextPage } from 'next/app';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbumDetails, selectAlbumDetails } from '../../redux/slices/lastfm/albumDetailsSlice';

import Layout from '../../components/layout';

import styles from './albumDetails.module.css';

const Album: NextPage = () => {
    const dispatch = useDispatch();
    const { albumDetails } = useSelector(selectAlbumDetails);
    dispatch(selectAlbumDetails);

    const router = useRouter();
    const { name, artist } = router.query;

    useEffect(() => {
        dispatch(fetchAlbumDetails({ artist: artist, album: name}));        
    }, []);

    console.log(albumDetails)

    return (
        <>
            <Head>
                <title>{artist} | {name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <h1>Album: {albumDetails.name}</h1>
                <div className={styles.grid}>
                    <div><img className={styles.albumCover} src={albumDetails.image[4]['#text']} /></div>
                    <div>Songs</div>
                </div>
            </Layout>
        </>
    )
}

export default Album;
