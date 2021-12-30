import React from 'react';
import PropTypes, { number, object, string } from 'prop-types';

import styles from './track.module.css';

import FavoriteButton from './favoriteButton';

function Track(props: any) {
    const { track, album } = props;

    const durationToMinutes = (durationSeconds: number) => {
        let fullTime = new Date(durationSeconds * 1000).toISOString().substring(19, 11);
        if (fullTime.split(':')[0] === '00')
            return `${fullTime.split(':')[1]}:${fullTime.split(':')[2]}`;
        return fullTime;
    }

    return (
        <div className={styles.track}>
            <div className={styles.position}>{track['@attr']['rank']}</div>
            <div className={styles.name}>{track.name}</div>
            <div className={styles.artist}>{track.artist.name}</div>
            <div className={styles.album}>{album}</div>
            <div className={styles.duration}>{durationToMinutes(track.duration)}</div>
            <div className={styles.favoriteBtn}>
                <FavoriteButton track={track}/>
            </div>
        </div>
    );
}

Track.propTypes = {
    track: object,
    album: string
}

export default Track;