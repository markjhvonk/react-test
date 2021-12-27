import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import EllipsisText from "react-ellipsis-text";

import styles from '../styles/album.module.css';

interface AlbumTypes {
    name: string;
    image: string;
    playcount: number;
}

function Album({ name, image, playcount }: AlbumTypes) {
    return (
        <div className={styles.AlbumWrapper}>
            <img className={styles.AlbumImage} src={image}/>
            <div className={styles.AlbumSide}>
                <EllipsisText text={name} length={"35"} className={styles.AlbumText} />
                <div className={styles.AlbumText}>{playcount}</div>
            </div>
        </div>
    );
}

Album.propTypes = {
    albumData: PropTypes.object
}

export default Album;