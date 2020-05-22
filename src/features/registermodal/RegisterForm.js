import React from 'react';
import styles from './RegisterModal.module.css';

export function RegisterForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label id="player-name" className={styles.label}>Your Name:</label>
      <input
        type="text"
        name="player-name"
        id="player-name"
        className={styles.input}
        required
        autoFocus
        onChange={e => props.setPlayerName(e.target.value)}
      />
    </form>
  );
}
