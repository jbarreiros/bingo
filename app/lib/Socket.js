/**
 * Manages websocket connection, and sends messages.
 */
export class Socket {
  /**
   * @param {Store} store
   */
  constructor(store) {
    this.socket = null;
    this.store = store;
    this.heartbeatIntervalMiliseconds = 2000;
    this.heartbeatIntervalId = null;
  }

  /**
   * @returns {string}
   */
  get url() {
    const protocol =
      window.location.protocol.toLowerCase() === "https:" ? "wss" : "ws";

    return `${protocol}://${window.location.host}`;
  }

  /**
   * @returns {Promise<void>}
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.addEventListener("open", () => {
        console.info("Websocket connected");
        this.startHeartbeat();
        resolve();
      });

      this.socket.addEventListener("close", this.onClose.bind(this));
      this.socket.addEventListener("message", this.onMessage.bind(this));
    });
  }

  /**
   * @param {number} code
   * @param {string} reason
   */
  onClose(code, reason) {
    console.warn("Websocket closed", code, reason);
  }

  /**
   * @param {MessageEvent} ev
   * @property {string} ev.data.event
   * @property {object} ev.data.data
   */
  onMessage(ev) {
    const data = JSON.parse(ev.data);
    const event = data.event;

    console.info(`Websocket received "${event}" event`);

    switch (event) {
      case "update":
        this.onUpdateEvent(data.data);
        break;
      default:
    }
  }

  /**
   * @param {Array<object>} players
   */
  onUpdateEvent(players) {
    if (players.length) {
      this.store.commit("updatePlayers", players);
    }
  }

  /**
   * @returns {boolean}
   */
  canSendMessage() {
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }

  startHeartbeat() {
    window.clearInterval(this.heartbeatIntervalId);

    this.heartbeatIntervalId = window.setInterval(
      this.send.bind(this, "heartbeat", {}),
      this.heartbeatIntervalMiliseconds
    );
  }

  /**
   * @param {string} event
   * @param {*} data
   */
  async send(event, data) {
    console.info(`Sending websocket "${event}" event`);

    if (!this.canSendMessage()) {
      console.warn("Websocket not connected, connecting...");
      await this.connect();
    }

    this.socket.send(JSON.stringify({ event, ...data }));
  }

  /**
   * @param {object} playerData
   */
  sendPlayerRegistration(playerData) {
    this.send("register", { player: playerData });
  }

  /**
   * @param {object} playerData
   */
  sendPlayerUpdate(playerData) {
    this.send("updatePlayer", { player: playerData });
  }
}
