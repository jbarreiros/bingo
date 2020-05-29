import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tileSelected, tileUnselected } from "../../app/appSlice";
import styles from "./BingoTile.module.css";

export function BingoTile(props) {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  function handleToggleTileSelection(e) {
    if (e.key && !(e.key === " " || e.key === "Enter")) {
      // allow click, spacebar and enter keys
      return;
    }

    // swap isSelected
    setIsSelected(!isSelected);

    // tell redux tile is selected or unselected
    if (!isSelected) {
      dispatch(tileSelected(props.tileIndex));
    } else {
      dispatch(tileUnselected(props.tileIndex));
    }
  }

  return (
    <div
      className={[styles.tile, isSelected ? styles.tileSelected : ""].join(" ")}
      tabIndex="0"
      role="button"
      aria-pressed={isSelected ? "true" : "false"}
      onClick={handleToggleTileSelection}
      onKeyDown={handleToggleTileSelection}
    >
      {props.label}
    </div>
  );
}
