import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ListTiles } from "pages/list-tiles/ListTiles";
import { NoGame } from "pages/no-game/NoGame";
import { Game } from "pages/game/Game";
import "./App.css";

const mockTiles = Array.from(Array(25).keys());
const playerTiles = window.pageData ? window.pageData.tiles : mockTiles;

export function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tiles">
                    <ListTiles tiles={playerTiles} />
                </Route>
                <Route path="/out-to-lunch">
                    <NoGame />
                </Route>
                <Route path="/">
                    <Game playerTiles={playerTiles} />
                </Route>
            </Switch>
        </Router>
    );
}