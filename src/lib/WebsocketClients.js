module.exports = class WebsocketClients {
  constructor() {
    this.clients = new Map();
  }

  saveClient(id, client) {
    this.clients.set(id, client);
  }

  removeClient(clientToRemove) {
    const [clientId] = [...this.clients.entries()].find(
      ([, client]) => clientToRemove === client
    );
    this.clients.delete(clientId);
  }

  getOtherClients(id) {
    const clients = new Map(this.clients);
    clients.delete(id);

    return clients;
  }

  getClientId(clientToFind) {
    const [clientId] = [...this.clients.entries()].find(
      ([, client]) => clientToFind === client
    );
    return clientId;
  }

  getClientIds() {
    return [...this.clients.keys()];
  }
};
