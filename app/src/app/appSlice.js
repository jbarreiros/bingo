import { createSlice } from '@reduxjs/toolkit';
import uuid from "uuid-random";

export const slice = createSlice({
    name: 'app',
    initialState: {
        app: {
            name: 'Paradigm Shifting Synergical Cloud Bingo',
            page: 'card' // card, opponents
        },
        current: {
            id: uuid(),
            name: '',
            tiles: [],
            selectedTiles: []
        },
        players: [
            // { same as "current" object }
            // {
            //   id: uuid(),
            //   name: 'Paco',
            //   tiles: randomizedTiles,
            //   selectedTiles: [4,5,6]
            // }
        ]
    },
    reducers: {
        setCurrentPlayerTiles: (state, action) => {
          state.current.tiles = action.payload;
        },
        setCurrentPlayerName: (state, action) => {
          state.current.name = action.payload;
        },
        tileSelected: (state, action) => {
            state.current.selectedTiles.push(action.payload);
        },
        tileUnselected: (state, action) => {
            state.current.selectedTiles = state.current.selectedTiles.filter(tile => tile !== action.payload);
        },
        changePage: (state, action) => {
            state.app.page = action.payload;
        }
    }
});

export const { setCurrentPlayerTiles, setCurrentPlayerName, tileSelected, tileUnselected, changePage } = slice.actions;

// example selector (getter)
export const selectAppName = state => state.app.app.name;
export const selectCurrentTiles = state => state.app.current.tiles;
export const selectActivePage = state => state.app.app.page;
export const selectNumPlayers = state => state.app.players.length;
export const selectPlayerName = state => state.app.current.name;
export const selectPlayerList = state => state.app.players;

export default slice.reducer;
