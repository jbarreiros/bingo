import { Socket } from "../lib/Socket";

let socket = null;

export default {
  /**
   * @param {Store} store
   * @param {string} newPage
   */
  changePage(store, newPage) {
    store.commit("setCurrentPage", newPage);
  },

  /**
   * @param {Store} store
   * @param {number} tileIndex
   */
  tileSelected(store, tileIndex) {
    store.commit("pushTileToSelectedList", tileIndex);
  },

  /**
   * @param {Store} store
   * @param {number} tileIndex
   */
  tileUnselected(store, tileIndex) {
    store.commit("popTileFromSelectedList", tileIndex);
  },

  /**
   * @param {Store} store
   * @param {string} playerName
   */
  setPlayerName(store, playerName) {
    store.commit("setPlayerName", playerName);
  },

  /**
   * @param {Store} store
   * @param {Array<string>} tiles
   */
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
