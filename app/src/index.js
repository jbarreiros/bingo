import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "app/store";
import { App } from "page/app/App";
import { ListTiles } from "page/list-tiles/ListTiles";
import "./index.css";

const mockTiles = Array.from(Array(25).keys());
const playerTiles = window.pageData ? window.pageData.tiles : mockTiles;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/tiles">
          <ListTiles tiles={playerTiles} />
        </Route>
        <Route path="/">
          <App playerTiles={playerTiles} />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
