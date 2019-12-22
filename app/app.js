/* global pageData */

import "./components/BingoTile";
import "./components/BingoCard";
import "./components/Tabs";
import "./components/TabItem";
import "./components/TabContainer";
import "./components/Opponents";
import "./components/Modal";
import "./components/RegisterModal";
import "./components/Player";
import "./components/MiniBingoCard";
import store from "./store/index";

// styles
import "./css/variables.css";
import "./css/layout.css";
import "./css/game-off.css";

store.dispatch("setPlayerTiles", pageData.tiles);

const registerModal = document.createElement("bingo-register-modal");
registerModal.addEventListener("bingo-modal-close", () => {
  store.dispatch("openWebsocket", store.state.current);
});

document.querySelector("body").appendChild(registerModal);
