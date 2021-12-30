import React from 'react';
// @ts-ignore
import EllipsisText from "react-ellipsis-text";
import Link from 'next/link'

import styles from './album.module.css';

interface AlbumTypes {
    name: string;
    artist: string;
    image: string;
    playcount: number;
}

function Album({ name, artist, image, playcount }: AlbumTypes) {
    return (
        <Link href={`/album/${encodeURIComponent(name)}?artist=${encodeURIComponent(artist)}`}>
            <div className={styles.AlbumWrapper}>
                <img className={styles.AlbumImage} src={image}/>
                <div className={styles.AlbumSide}>
                    <EllipsisText text={name} length={30} className={styles.AlbumText} />
                    <div className={styles.AlbumText}>{playcount}</div>
                </div>
            </div>
        </Link>
    );
}

export default Album;