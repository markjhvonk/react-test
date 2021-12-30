import PropTypes, { object } from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, add, remove } from '../../redux/slices/favorites/favoritesSlice';

import styles from './track.module.css';

function FavoriteButton(props: any) {
    const { track } = props;

    const dispatch = useDispatch();
    const { value } = useSelector(selectFavorites);
    dispatch(selectFavorites);

    const status = value.find(t => t.id === track.id) ? true : false;

    const addFavorite = (id: string, track: object) => {
        // Add to favorites if it's not already in the list
        if (status) {
            dispatch(remove(id))
        } else {
            dispatch(add({ id: id, track: track }))
        }
    }

    return (
        <div className={styles.favoriteButtonWrapper} onClick={() => addFavorite(track.id, track)}>
            <svg className={status ? styles.favoriteButtonActive : styles.favoriteButton}
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="32"
                viewBox="0 0 32 32">
                <g
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeLinejoin="miter"
                    transform="translate(0.5 0.5)">
                    <polygon points="16 3.417 19 13 29 13 21.054 18.971 24.177 28.583 16 22.642 7.823 28.583 10.946 18.971 3 13 13 13 16 3.417"></polygon>
                </g>
            </svg>
        </div>
    );
}

FavoriteButton.propTypes = {
    track: object
}

export default FavoriteButton;