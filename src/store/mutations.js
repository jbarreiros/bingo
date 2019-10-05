export default {
  setCurrentPage(state, newPage) {
    state.app = Object.assign({}, state.app, { page: newPage });
    return state;
  },

  pushTileToSelectedList(state, tileIdx) {
    // not using push(), to ensure immutability
    state.current = Object.assign(
      {},
      state.current,
      { selectedTiles: [...state.current.selectedTiles, tileIdx] }
    );
    return state;
  },

  popTileFromSelectedList(state, tileIdx) {
    state.current = Object.assign(
      {},
      state.current,
      { selectedTiles: state.current.selectedTiles.filter(tile => tile !== tileIdx) }
    );
    return state;
  }
}
