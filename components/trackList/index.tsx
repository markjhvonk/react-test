import React from 'react';
import PropTypes, { string } from 'prop-types';

import styles from './trackList.module.css';
import Track from '../track';

function TrackList(props: any) {
    const { tracks, album } = props;

    return (
        <div className={styles.trackList}>
            {Array.isArray(tracks) ? 
                tracks.map((track: any) => {
                    return <Track key={track.id} track={track} album={album} />
                })
                :
                <span>Something went wrong displaying the tracks...</span>
            }
        </div>
    );
}

TrackList.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object),
    album: string
}

export default TrackList;