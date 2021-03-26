import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useInterval } from "hooks/useInterval";
import { fetchHelper } from "hooks/useFetch";
import { ListTiles } from "pages/list-tiles/ListTiles";
import { NoGame } from "pages/no-game/NoGame";
import { Game } from "pages/game/Game";
import "./App.css";

const mockTiles = Array.from(Array(25).keys());
const playerTiles = window.pageData ? window.pageData.tiles : mockTiles;

export function App() {
  const [allowPlayers, setAllowPlayers] = useState(false);

  useInterval(() => {
    (async () => {
      const json = await fetchHelper('/game', { method: 'GET' });
      setAllowPlayers(json.allowPlayers);
    })();
  }, 5000);

  return (
    <Router>
      <Switch>
        <Route path="/tiles">
          <ListTiles tiles={playerTiles} />
        </Route>
        <Route path="/">
          {
            allowPlayers
              ? <Game playerTiles={playerTiles} />
              : <NoGame />
          }
        </Route>
      </Switch>
    </Router>
  );
}