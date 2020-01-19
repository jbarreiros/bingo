const express = require("express");
const WebSocketClients = require("../lib/WebSocketClients");
const controller = require("../controllers/websocket");
const router = express.Router();
const clients = new WebSocketClients();

/**
 * A list of players and their game data.
 * Key = uuid (generated on the frontend)
 * Value = JSON object (see app/store/state.js)
 * @type Map<uuid, object>
 */
const players = new Map();

router.ws("/", client => {
  client.onmessage = controller.onMessage.bind(null, client, clients, players);
});

module.exports = router;
