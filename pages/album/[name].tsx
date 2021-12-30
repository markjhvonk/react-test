import { useEffect } from 'react';
import { useRouter } from 'next/router';
//@ts-ignore
import type { NextPage } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbumDetails, selectAlbumDetails, clearState } from '../../redux/slices/lastfm/albumDetailsSlice';

import Layout from '../../components/layout';
import TrackList from '../../components/trackList';

import styles from './albumDetails.module.css';

const Album: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { albumDetails } = useSelector(selectAlbumDetails);
    const { status } = albumDetails;
    const album = albumDetails.albumDetails;
    dispatch(selectAlbumDetails);

    const loading = status === 'loading';
    let hasAlbumCover = undefined;
    if (album) {
        hasAlbumCover = album.image[album.image.length - 1]['#text'] !== '' ? true : false;
    }
    
    useEffect(() => {
        if (!router.isReady) return;
        dispatch(fetchAlbumDetails({ artist: String(router.query.artist), album: String(router.query.name) }));
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>{router.query.artist} | {router.query.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                {album &&
                <>
                    <h1>Album: <span>{album.name}</span> {loading && <span>...</span>}</h1>
                    <div className={styles.grid}>
                        <div>
                            <div className={styles.albumCoverWrapper}>
                                {(loading || !hasAlbumCover) && <Image className={styles.albumCover} width={300} height={300} layout="responsive" alt={`Album cover placeholder`} src="/images/album-placeholder.png" /> }
                                {(!loading && hasAlbumCover) && <Image className={styles.albumCover} width={300} height={300} layout="responsive" alt={`Album cover for ${album.name}`} src={album.image[album.image.length - 1]['#text']} /> }
                            </div>
                        </div>
                        <div>
                            <h2>Tracks:</h2>
                            {album.tracks && <TrackList tracks={album.tracks.track} album={album.name}/> }
                            {(!album.tracks && !loading) && <p>No tracks found...</p> }
                        </div>
                    </div>
                </>
                }
            </Layout>
        </>
    )
}

export default Album;
