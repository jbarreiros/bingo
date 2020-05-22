import React from 'react';
import { useSelector } from 'react-redux';
import { selectNumPlayers } from '../../app/appSlice';
import styles from './OpponentsBadge.module.css';

export function OpponentsBadge(props) {
  const numPlayers = useSelector(selectNumPlayers) - 1; // subtract current player
  const numOpponents = numPlayers > -1 ? numPlayers : 0;

  return (
    <span className={styles.badge}>
      {numOpponents}
    </span>
  );
}
