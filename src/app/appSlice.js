import { createSlice } from '@reduxjs/toolkit';
import uuid from "uuid-random";

const tiles = [
    'fih-nance',
    'datto drive',
    'mrr',
    'akward chuckling at something that should not be laughed at',
    'vista',
    'open ecosystem',
    'the channel',
    'ccat',
    'our partners',
    'failure',
    'mountains, mountain accessories',
    'okrs',
    'iteration',
    'stack ranking',
    'smbs',
    'sherpa',
    'space-related metaphor',
    'scale',
    'ebitda',
    'dattocon',
    'go-to-market',
    'do the right thing',
    'sazz',
    'oracle'
];
const freeTile = 'this presentation is confidential';
const randomizedTiles = tiles.sort(() => Math.random() - 0.5);
randomizedTiles.splice(12, 0, freeTile);

export const slice = createSlice({
    name: 'app',
    initialState: {
        app: {
            name: 'Paradigm Shifting Synergical Cloud Bingo',
            page: 'card'
        },
        current: {
            id: uuid(),
            name: '',
            tiles: randomizedTiles,
            selectedTiles: []
        },
        players: [
            // { same as "current" object }
        ]
    },
    reducers: {
        tileSelected: (state, action) => {
            state.current.selectedTiles.push(action.payload);
        },
        tileUnselected: (state, action) => {
            state.current.selectedTiles = state.current.selectedTiles.filter(tile => tile !== action.payload);
        }
    }
});

export const { tileSelected, tileUnselected } = slice.actions;

// example selector (getter)
export const selectAppName = state => state.app.app.name;
export const selectTiles = state => state.app.current.tiles;

export default slice.reducer;
