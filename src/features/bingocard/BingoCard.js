import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTiles } from '../../app/appSlice';
import { BingoTile } from '../bingotile/BingoTile';
import styles from './BingoCard.module.css';

function BingoLetters() {
    return [..."bingo"].map((letter) => 
        <div className={styles.letter}>{letter}</div>
    );
}

export function BingoCard() {
    const tiles = useSelector(selectTiles);

    const tileItems = tiles.map((tile) => 
        <BingoTile key={tile.toString()} label={tile}/>
    );

    return (
        <div className={styles.bingoCard}>
            <BingoLetters/>
            {tileItems}
        </div>
    );
}