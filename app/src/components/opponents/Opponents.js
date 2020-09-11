import React from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentPlayer, selectPlayerList } from "app/appSlice";
import { MiniBingoCard } from "components/minibingocard/MiniBingoCard";
import styles from "./Opponents.module.css";

function NoPlayers() {
  return <p className={styles.noPlayers}>Bingo is better with friends!</p>;
}

function PlayerList(props) {
  return props.players.map((player, index) => (
    <MiniBingoCard key={player.id} player={player} />
  ));
}

export function Opponents(props) {
  const players = useSelector(selectPlayerList);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const opponents = players.filter((player) => player.id !== currentPlayer.id);

  return (
    <div className={classnames(props.className, styles.opponents)}>
      {opponents.length > 0 ? (
        <PlayerList players={opponents} />
      ) : (
        <NoPlayers />
      )}
    </div>
  );
}
