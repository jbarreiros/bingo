export default {
  tileSelected(state, payload) {
    // not using push(), to ensure immutability
    state.current.selectedTiles = [...state.current.selectedTiles, payload];
    return state;
  },

  tileUnselected(state, payload) {
    state.current.selectedTiles = state.current.selectedTiles.filter(tile => tile !== payload);
    return state;
  }
}
