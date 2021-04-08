import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ListTiles } from "pages/list-tiles/ListTiles";
import { Game } from "pages/game/Game";
import "./App.css";

// const mockTiles = Array.from(Array(25).keys());
// const playerTiles = window.pageData ? window.pageData.tiles : mockTiles;

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tiles">
          <ListTiles />
        </Route>
        <Route path="/">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}