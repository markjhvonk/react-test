import React from 'react';
import PropTypes from 'prop-types';
import Album from './album';

import styles from '../styles/albumList.module.css';

function AlbumsList(props: any) {
    const albums = props.albums;

    return (
        <div className={styles.AlbumList}>
            {albums.map((album: any) => {
                return <Album name={album.name} image={album.image[3]['#text']} playcount={album.playcount}/>
            })}
        </div>
    );
}

AlbumsList.propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object)
}

export default AlbumsList;