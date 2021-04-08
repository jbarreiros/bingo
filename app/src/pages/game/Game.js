import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { selectAppName, setCurrentPlayerTiles, updatePlayers } from "app/appSlice";
import { useInterval } from "hooks/useInterval";
import { getJson } from "hooks/useFetch";
import { BingoCardHeader } from "components/bingocard/BingoCardHeader";
import { BingoCard } from "components/bingocard/BingoCard";
import { CurrentPlayer } from "components/currentplayer/CurrentPlayer";
import { Opponents } from "components/opponents/Opponents";
import { RegisterModal } from "components/registermodal/RegisterModal";
import { Footer } from "components/footer/Footer";
import { NoGame } from "pages/no-game/NoGame";
import socket from "app/socket";
import styles from "./Game.module.css";

function Bingo(props) {
  if (props.gameStarted) {
    return (
      <>
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

  return <NoGame />;
}

export function Game() {
  const dispatch = useDispatch();
  const appName = useSelector(selectAppName);

  const [interval, setInterval] = useState(999999);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  // register event for incoming websocket messages
  socket.registerEvent(
    (eventName, data) =>
      eventName === "update" && dispatch(updatePlayers(data.players))
  );

  async function isGameStarted() {
    const { allowPlayers } = await getJson('/api/game');
    return allowPlayers;
  }

  async function dispatchTiles() {
    const tiles = await getJson('/api/tiles/player');
    dispatch(setCurrentPlayerTiles(tiles));
  }

  // initial state
  useEffect(() => {
    (async () => {
      const allowPlayers = await isGameStarted();
      setGameStarted(allowPlayers);

      if (!allowPlayers) {
        // start polling to watch for when game starts
        setInterval(10000);
      } else {
        await dispatchTiles();
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // waiting for game to start interval
  useInterval(() => {
    (async () => {
      const allowPlayers = await isGameStarted();
      if (gameStarted === false && allowPlayers) {
        setLoading(true);
        dispatchTiles();
        setGameStarted(true);
        setLoading(false);
        setInterval(999999);
      }
    })();
  }, interval);

  return (
    <>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      { loading ? 'Loading...' : <Bingo gameStarted={gameStarted} />}
    </>
  );
}
