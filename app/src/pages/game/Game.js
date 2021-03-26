import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppName, setCurrentPlayerTiles, updatePlayers } from "app/appSlice";
import { Helmet } from "react-helmet";
import { BingoCardHeader } from "components/bingocard/BingoCardHeader";
import { BingoCard } from "components/bingocard/BingoCard";
import { CurrentPlayer } from "components/currentplayer/CurrentPlayer";
import { Opponents } from "components/opponents/Opponents";
import { RegisterModal } from "components/registermodal/RegisterModal";
import { Footer } from "components/footer/Footer";
import socket from "app/socket";
import styles from "./Game.module.css";

export function Game(props) {
  const dispatch = useDispatch();
  const appName = useSelector(selectAppName);

  // register event for incoming websocket messages
  socket.registerEvent(
    (eventName, data) =>
      eventName === "update" && dispatch(updatePlayers(data.players))
  );

  dispatch(setCurrentPlayerTiles(props.playerTiles));

  return (
    <>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <div className={styles.pageWrapper}>
        <BingoCardHeader className={styles.bingoCardHeader} />
        <BingoCard className={styles.bingoCard} />
        <CurrentPlayer className={styles.currentPlayer} />
        <Opponents className={styles.opponents} />
        <Footer className={styles.pageFooter} />
      </div>
      <RegisterModal />
    </>
  );
}
