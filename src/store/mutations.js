export default {
  setCurrentPage(state, newPage) {
    console.log('setCurrentPage');
    return { ...state, app: { ...state.app, page: newPage } };
  },

  pushTileToSelectedList(state, tileIdx) {
    // not using push(), to ensure immutability
    console.log('pushTileToSelectedList');
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: [...state.current.selectedTiles, tileIdx]
      }
    };
  },

  popTileFromSelectedList(state, tileIdx) {
    console.log('popTitleFromSelectedList');
    return {
      ...state,
      current: {
        ...state.current,
        selectedTiles: state.current.selectedTiles.filter(tile => tile !== tileIdx)
      }
    };
  },

  updatePlayers(state, players) {
    console.log('updatePlayers');
    return {
      ...state,
      players
    };
  }
}
