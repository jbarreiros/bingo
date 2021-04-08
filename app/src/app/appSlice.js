import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid-random";
import socket from "app/socket";

export const slice = createSlice({
  name: "app",
  initialState: {
    app: {
      name: "Paradigm Shifting Synergical Cloud Bingo",
    },
    current: {
      id: uuid(),
      name: "",
      tiles: [],
      selectedTiles: [],
    },
    players: [
      // same as "current" object:
      // {
      //   id: uuid(),
      //   name: 'Jane',
      //   tiles: [],
      //   selectedTiles: [4,5,6]
      // }
    ],
  },
  reducers: {
    setCurrentPlayerTiles: (state, action) => {
      state.current.tiles = action.payload;
    },
    setCurrentPlayerName: (state, action) => {
      state.current.name = action.payload;
    },
    addTile: (state, action) => {
      state.current.selectedTiles.push(action.payload);
    },
    removeTile: (state, action) => {
      state.current.selectedTiles = state.current.selectedTiles.filter(
        (tile) => tile !== action.payload
      );
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

//
// actions

export const {
  setCurrentPlayerTiles,
  updatePlayers,
} = slice.actions;

//
// thunks

export const registerPlayer = (playerName) => async (dispatch, getState) => {
  dispatch(slice.actions.setCurrentPlayerName(playerName));
  try {
    socket.sendPlayerRegistration(getState().app.current);
  } catch (e) {
    // TODO something
  }
};

export const changePlayerName = (playerName) => async (dispatch, getState) => {
  dispatch(slice.actions.setCurrentPlayerName(playerName));
  try {
    socket.sendPlayerUpdate(getState().app.current);
  } catch (e) {
    // TODO something
  }
};

export const tileSelected = (tileId) => async (dispatch, getState) => {
  dispatch(slice.actions.addTile(tileId));
  try {
    socket.sendPlayerUpdate(getState().app.current);
  } catch (e) {
    // TODO something
  }
};

export const tileUnselected = (tileId) => async (dispatch, getState) => {
  dispatch(slice.actions.removeTile(tileId));
  try {
    socket.sendPlayerUpdate(getState().app.current);
  } catch (e) {
    // TODO something
  }
};

//
// selectors

export const selectAppName = (state) => state.app.app.name;
export const selectCurrentPlayer = (state) => state.app.current;
export const selectPlayerList = (state) => state.app.players;
export const selectNumPlayers = (state) => state.app.players.length;

export default slice.reducer;
