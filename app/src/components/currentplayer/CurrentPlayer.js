import React from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentPlayer } from "../../app/appSlice";
import styles from "./CurrentPlayer.module.css";

export function CurrentPlayer(props) {
  const { name } = useSelector(selectCurrentPlayer);
  return (
    <div className={classnames(props.className, styles.currentPlayer)}>
      {`${name} `}
      <span role="img" aria-label="">
        &#128100;
      </span>
    </div>
  );
}
