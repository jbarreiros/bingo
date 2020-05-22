import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerList } from '../../app/appSlice';
import styles from './Opponents.module.css';
import { MiniBingoCard } from '../minibingocard/MiniBingoCard';

function NoPlayers() {
  return <p>No one has joined yet!</p>
}

function PlayerList(props) {
  return props.players.map((player, index) => (
    <MiniBingoCard key={player.id} player={player}/>
  ));
}

export function Opponents(props) {
  const players = useSelector(selectPlayerList);

  return (
    <div className={styles.opponents}>
      {players.length > 0 ? <PlayerList players={players}/> : <NoPlayers/>}
    </div>
  );
}
