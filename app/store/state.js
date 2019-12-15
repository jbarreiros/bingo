import uuid from "uuid-random";

export default {
  app: {
    page: "card"
  },
  current: {
    id: uuid(),
    name: "",
    tiles: [],
    selectedTiles: []
  },
  players: [
    // { same as "current" object }
  ]
};
