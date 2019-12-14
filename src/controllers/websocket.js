/**
 * @param {WebSocket} client
 * @param {WebSocketClients} clients
 * @param {Map} players
 */
exports.onClose = function(client, clients, players) {
  const userId = clients.getClientId(client);

  clients.removeClient(client);
  players.delete(userId);

  // send updated players list to all players
  sendUpdateToOtherPlayers(userId, clients, players);
};

/**
 * @param {WebSocket} client
 * @param {WebSocketClients} clients
 * @param {Map} players
 * @param {Event} ev
 */
exports.onMessage = function(client, clients, players, ev) {
  const data = JSON.parse(ev.data);
  const userId = data.player.id;

  players.set(userId, data.player);

  if (data.event === "register") {
    clients.addClient(userId, client);
    // send this new player the list of all players
    sendUpdate(client, players);
  }

  // send updated players list to all players
  sendUpdateToOtherPlayers(userId, clients, players);
};

/**
 * Sends an "update" event websocket message.
 * @param {WebSocket} client
 * @param {Map} players
 */
function sendUpdate(client, players) {
  const payload = {
    event: "update",
    data: [...players.values()]
  };

  client.send(JSON.stringify(payload));
}

/**
 * Sends an "update" event websocket message to all clients, except for the
 * client matching the passed userId.
 * @param {uuid} userId
 * @param {WebSocketClients} clients
 * @param {Map} players
 */
function sendUpdateToOtherPlayers(userId, clients, players) {
  for (let client of clients.getOtherClients(userId)) {
    sendUpdate(client, players);
  }
}
