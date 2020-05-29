import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer } from '../../app/appSlice';
import { BingoTile } from '../bingotile/BingoTile';
import styles from './BingoCard.module.css';

function BingoLetters() {
  return [..."bingo"].map((letter) =>
    <div key={letter} className={styles.letter}>{letter}</div>
  );
}

export function BingoCard() {
  const { tiles } = useSelector(selectCurrentPlayer);
  const tileItems = tiles.map((tile, index) =>
      <BingoTile key={tile.toString()} tileIndex={index} label={tile}/>
  );

  return (
      <div className={styles.bingoCard}>
          <BingoLetters/>
          {tileItems}
      </div>
  );
}
