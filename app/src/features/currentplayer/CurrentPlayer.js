import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerName } from '../../app/appSlice';
import styles from './CurrentPlayer.module.css';

export function CurrentPlayer() {
  return (
    <div className={styles.currentPlayer}>
      <span role="img" aria-label="">&#128100;</span> {useSelector(selectPlayerName)}
    </div>
  );
}
