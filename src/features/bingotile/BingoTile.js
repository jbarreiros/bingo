import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tileSelected, tileUnselected } from '../../app/appSlice';
import styles from './BingoTile.module.css';

export function BingoTile(props) {
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);

    function handleToggleTileSelection() {
        // swap isSelected
        setIsSelected(!isSelected);

        // tell redux tile is selected or unselected
        if (!isSelected) {
            dispatch(tileSelected(props.tileIndex));
        } else {
            dispatch(tileUnselected(props.tileIndex));
        }

        // TODO announce? that player has been updated
    }

    return (
        <div
            className={[styles.tile, isSelected ? styles.tileSelected : ''].join(' ')}
            tabIndex="0"
            role="button"
            aria-pressed={isSelected ? 'true' : 'false'}
            onClick={handleToggleTileSelection}
            onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && handleToggleTileSelection()}
        >
            {props.label}
        </div>
    );
}