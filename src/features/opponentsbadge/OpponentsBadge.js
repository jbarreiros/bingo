import React from 'react';
import { useSelector } from 'react-redux';
import { selectNumPlayers } from '../../app/appSlice';
import styles from './OpponentsBadge.module.css';

export function OpponentsBadge(props) {
  const numPlayers = useSelector(selectNumPlayers);
  const numOpponents = numPlayers > 0 ? (numPlayers - 1) : 0;

  return (
    <span className={styles.badge}>
      {numOpponents}
    </span>
  );
}
