export default {
  /**
   * @param {object} state
   * @param {string} newPage
   */
  setCurrentPage(state, newPage) {
    return {
      ...state,
      app: {
        ...state.app,
        page: newPage
      }
    };
  },

  /**
   * @param {object} state
   * @param {number} tileIndex
   */
  pushTileToSelectedList(state, tileIndex) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: [...state.current.selectedTiles, tileIndex]
      }
    };
  },

  /**
   * @param {object} state
   * @param {number} tileIndex
   */
  popTileFromSelectedList(state, tileIndex) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: state.current.selectedTiles.filter(
          tile => tile !== tileIndex
        )
      }
    };
  },

  /**
   * @param {object} state
   * @param {Array<object>} players
   */
  updatePlayers(state, players) {
    return {
      ...state,
      players
    };
  },

  /**
   * @param {object} state
   * @param {string} playerName
   */
  setPlayerName(state, playerName) {
    return {
      ...state,
      current: {
        ...state.current,
        name: playerName
      }
    };
  },

  /**
   * @param {object} state
   * @param {Array<string>} tiles
   */
  setPlayerTiles(state, tiles) {
    return {
      ...state,
      current: {
        ...state.current,
        tiles
      }
    };
  }
};
