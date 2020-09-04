import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePlayerName, selectCurrentPlayer } from "../../app/appSlice";
import classnames from "classnames";
import styles from "./CurrentPlayer.module.css";

const KEY = {
  ESC: 27,
  ENTER: 13
};

function NameLabel(props) {
  return (
    <span
      className={styles.playerName}
      onFocus={() => props.setIsEditing(true)}
      tabIndex={0}
    >
      {props.name || 'New phone, who dis?'}
    </span>
  );
}

function NameForm(props) {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState(props.name);

  function onKeyUp(e) {
    if (e.keyCode === KEY.ESC) {
      props.setIsEditing(false);
    } else if (e.keyCode === KEY.ENTER) {
      dispatch(changePlayerName(e.target.value));
      props.setIsEditing(false);
    }
  }

  return (
    <input
      type="text"
      className={styles.playerNameInput}
      minLength="3"
      maxLength="20"
      size="18"
      name="newName"
      value={playerName}
      autoFocus
      onBlur={() => props.setIsEditing(false)}
      onChange={(e) => setPlayerName(e.target.value)}
      onKeyUp={onKeyUp}
    />
  );
}

export function CurrentPlayer(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { name: playerName } = useSelector(selectCurrentPlayer);

  return (
    <div className={classnames(props.className, styles.currentPlayer)}>
      {
        isEditing
        ? <NameForm name={playerName} setIsEditing={setIsEditing} />
        : <NameLabel name={playerName} setIsEditing={setIsEditing} />
      }
      <span className={styles.icon} role="img" aria-label="">
        &#128100;
      </span>
    </div>
  );
}
