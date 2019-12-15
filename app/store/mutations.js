export default {
  setCurrentPage(state, newPage) {
    return {
      ...state,
      app: {
        ...state.app,
        page: newPage
      }
    };
  },

  pushTileToSelectedList(state, tileIndex) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: [...state.current.selectedTiles, tileIndex]
      }
    };
  },

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

  updatePlayers(state, players) {
    return {
      ...state,
      players
    };
  },

  setPlayerName(state, playerName) {
    return {
      ...state,
      current: {
        ...state.current,
        name: playerName
      }
    };
  },

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
