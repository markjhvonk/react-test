import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//@ts-ignore
import type { NextPage } from 'next/app'; 
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums, selectAlbums } from '../redux/slices/lastfm/albumsSlice';

import Layout from '../components/layout'
import AlbumsList from '../components/albumList';

const Home: NextPage = () => {
  const router = useRouter();
  const { albums } = useSelector(selectAlbums);
  const dispatch = useDispatch();
  dispatch(selectAlbums);

  const defaultArtist: string = 'Nothing But Thieves';
  const [selectedArtist, setSelectedArtist] = useState<string | string[]>(defaultArtist);

  useEffect(() => {
    // Check to see if an artist was passed
    if (router.query.artist) {
      setSelectedArtist(router.query.artist);
      return;
    }
    dispatch(fetchAlbums(String(selectedArtist)));
  }, [router.isReady]);

  useEffect(() => {
    // Fetch albums if a new artist was detected
    if (selectedArtist !== defaultArtist) dispatch(fetchAlbums(String(selectedArtist)));
  }, [selectedArtist]);

  return (
    <>
      <Head>
        <title>Albums App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-2xl">Albums for: <i><u>{selectedArtist}</u></i></h1>
        {albums &&
          <AlbumsList albums={albums}/>
        }
      </Layout>
    </>
  )
}

export default Home
