import React from "react";
import classnames from "classnames";
import styles from "./BingoCard.module.css";

export function BingoCardHeader(props) {
  const letters = [..."bingo"].map((letter) => (
    <div key={letter} className={styles.letter}>
      {letter}
    </div>
  ));

  return (
    <div className={classnames(props.className, styles.bingoCardHeader)}>
      {letters}
    </div>
  );
}
