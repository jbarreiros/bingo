import React from "react";
import styles from "./MiniBingoCard.module.css";

function Tiles(props) {
  // props.allTiles
  // props.selectedTiles

  function isTileSelected(tileToMatch) {
    return (
      props.selectedTiles.find((tile) => tile === tileToMatch) !== undefined
    );
  }

  return props.allTiles.map((tileLabel, tileIndex) => (
    <div
      key={tileIndex}
      className={[
        styles.bingoTile,
        isTileSelected(tileIndex) ? styles.bingoTileSelected : "",
      ].join(" ")}
      title={tileLabel}
    ></div>
  ));
}

export function MiniBingoCard(props) {
  // props.player

  return (
    <div className={styles.miniBingoCard}>
      <div className={styles.bingoCard}>
        <Tiles
          allTiles={props.player.tiles}
          selectedTiles={props.player.selectedTiles}
        />
      </div>
      <div className={styles.bingoPlayer}>{props.player.name}</div>
    </div>
  );
}
