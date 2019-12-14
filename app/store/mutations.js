export default {
  setCurrentPage(state, newPage) {
    return { ...state, app: { ...state.app, page: newPage } };
  },

  pushTileToSelectedList(state, tileIdx) {
    // not using push(), to ensure immutability
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: [...state.current.selectedTiles, tileIdx]
      }
    };
  },

  popTileFromSelectedList(state, tileIdx) {
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: state.current.selectedTiles.filter(
          tile => tile !== tileIdx
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
