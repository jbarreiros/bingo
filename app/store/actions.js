let socket = null;

export default {
  changePage(store, newPage) {
    store.commit("setCurrentPage", newPage);
  },

  tileSelected(store, payload) {
    store.commit("pushTileToSelectedList", payload);
  },

  tileUnselected(store, payload) {
    store.commit("popTileFromSelectedList", payload);
  },

  setPlayerName(store, playerName) {
    store.commit("setPlayerName", playerName);
  },

  setPlayerTiles(store, tiles) {
    store.commit("setPlayerTiles", tiles);
  },

  // https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
  openWebsocket(store, payload) {
    const protocol =
      window.location.protocol.toLowerCase() === "https:" ? "wss" : "ws";
    socket = new WebSocket(`${protocol}://${location.host}`);

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: "register",
          player: payload
        })
      );
    };

    socket.onmessage = ev => {
      const data = JSON.parse(ev.data);
      const players = data.data;

      if (players.length) {
        store.commit("updatePlayers", players);
      }
    };
  },

  updatePlayer(store, payload) {
    socket.send(
      JSON.stringify({
        event: "updatePlayer",
        player: payload
      })
    );
  }
};
