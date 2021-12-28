import { useEffect } from 'react';
//@ts-ignore
import type { NextPage } from 'next/app'; 
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums, selectAlbums } from '../redux/slices/lastfm/albumsSlice';

import Layout from '../components/layout'
import AlbumsList from '../components/albumList';

const Home: NextPage = () => {
  const { albums } = useSelector(selectAlbums);
  const dispatch = useDispatch();
  dispatch(selectAlbums);

  const selectedArtist = "Nothing But Thieves"

  useEffect(() => {
    dispatch(fetchAlbums(selectedArtist));
  }, []);

  return (
    <>
      <Head>
        <title>Albums App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-2xl">Albums for {selectedArtist}</h1>

        {albums &&
          <AlbumsList albums={albums}/>
        }
      </Layout>
    </>
  )
}

export default Home
