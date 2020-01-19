/**
 * Manages a list of websocket clients.
 */
module.exports = class WebSocketClients {
  constructor() {
    /** @type Map<uuid, WebSocket> */
    this.clients = new Map();
  }

  /**
   * @param {uuid} id
   * @param {WebSocket} client
   */
  addClient(id, client) {
    this.clients.set(id, client);
  }

  /**
   * @param {WebSocket} clientToRemove
   */
  removeClient(clientToRemove) {
    for (const [id, client] of this.clients) {
      if (client === clientToRemove) {
        this.clients.delete(id);

        return;
      }
    }
  }

  /**
   * @param {uuid} idToIgnore
   * @yields {[number, WebSocket]}
   */
  *getOtherClients(idToIgnore) {
    for (const [id, client] of this.clients) {
      if (id !== idToIgnore) {
        yield [id, client];
      }
    }
  }

  /**
   * @param {WebSocket} clientToFind
   * @return uuid|undefined
   */
  getClientId(clientToFind) {
    for (const [id, client] of this.clients) {
      if (client === clientToFind) {
        return id;
      }
    }
  }
};
