import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer } from '../../app/appSlice';
import styles from './CurrentPlayer.module.css';

export function CurrentPlayer() {
  const { name } = useSelector(selectCurrentPlayer);
  return (
    <div className={styles.currentPlayer}>
      <span role="img" aria-label="">&#128100;</span> {name}
    </div>
  );
}
