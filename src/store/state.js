import uuid from 'uuid-random';

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

const randomizedTiles = tiles.sort(() => Math.random() - 0.5);
randomizedTiles.splice(12, 0, 'this presentation is confidential');

export default {
  app: {
    page: 'card'
  },
  current: {
    id: uuid(),
    name: 'Unknown Player',
    tiles: randomizedTiles,
    selectedTiles: [],
  },
  players: []
}

/*
players: [
  {
    id: #,
    name: '',
    tiles: [],
    selectedTiles: []
  }
]
*/
