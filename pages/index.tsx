import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums, selectAlbums } from '../redux/slices/lastfm/albumsSlice';

import AlbumsList from '../components/albumsList';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { albums } = useSelector(selectAlbums);
  const dispatch = useDispatch();
  dispatch(selectAlbums);

  const selectedArtist = "Nothing But Thieves"

  useEffect(() => {
    dispatch(fetchAlbums(selectedArtist));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Albums App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-2xl">Albums for {selectedArtist}</h1>

        {albums &&
          <>
            <h5>Test albums! {albums.length}</h5>
            <AlbumsList albums={albums}/>
          </>
        }
      </main>
    </div>
  )
}

export default Home
