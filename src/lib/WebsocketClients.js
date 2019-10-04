module.exports = class WebsocketClients {
  constructor() {
    this.clients = new Map();
  }

  saveClient(id, client) {
    this.clients.set(id, client);
  }

  removeClient(clientToRemove) {
    const [clientId] = [...this.clients.entries()].find(([id, client]) => clientToRemove === client);
    this.clients.delete(clientId);
  }

  getOtherClients(id) {
    const clients = new Map(this.clients);
    clients.delete(id);

    return clients;
  }

  getClientIds() {
    return [...this.clients.keys()];
  }
}
