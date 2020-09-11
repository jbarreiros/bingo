import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAppName, setCurrentPlayerTiles, updatePlayers } from "app/appSlice";
import { BingoCardHeader } from "components/bingocard/BingoCardHeader";
import { BingoCard } from "components/bingocard/BingoCard";
import { CurrentPlayer } from "components/currentplayer/CurrentPlayer";
import { Opponents } from "components/opponents/Opponents";
import { RegisterModal } from "components/registermodal/RegisterModal";
import { Footer } from "components/footer/Footer";
import socket from "app/socket";
import "./App.css";

export function App(props) {
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
      <div className="page-wrapper">
        <BingoCardHeader className="bingo-card-header" />
        <BingoCard className="bingo-card" />
        <CurrentPlayer className="current-player" />
        <Opponents className="opponents" />
        <Footer className="page-footer" appName={appName} />
      </div>
      <RegisterModal />
    </>
  );
}
