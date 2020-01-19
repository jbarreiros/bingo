import { Socket } from "../lib/Socket";

let socket = null;

export default {
  changePage(store, newPage) {
    store.commit("setCurrentPage", newPage);
  },

  tileSelected(store, payload) {
    store.commit("pushTileToSelectedList", payload);
  },

  tileUnselected(store, payload) {
    store.commit("popTileFromSelectedList", payload);
  },

  setPlayerName(store, playerName) {
    store.commit("setPlayerName", playerName);
  },

  setPlayerTiles(store, tiles) {
    store.commit("setPlayerTiles", tiles);
  },

  /**
   * @param {Store} store
   * @param {object} playerData
   */
  openWebsocket(store, playerData) {
    socket = new Socket(store);
    socket.sendPlayerRegistration(playerData);
  },

  /**
   * @param {Store} store
   * @param {object} playerData
   */
  updatePlayer(store, playerData) {
    socket.sendPlayerUpdate(playerData);
  }
};
