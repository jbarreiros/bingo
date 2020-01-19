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
      console.log("connecting websocket");

      this.socket = new WebSocket(this.url);

      this.socket.addEventListener("open", () => {
        console.log("websocket connected, resolve promise");
        resolve();
      });

      this.socket.addEventListener("close", this.onClose.bind(this));
      this.socket.addEventListener("pong", this.onPong.bind(this));
      this.socket.addEventListener("message", this.onMessage.bind(this));

      console.log("done setting up websocket event handlers");
    });
  }

  /**
   * @param {number} code
   * @param {string} reason
   */
  onClose(code, reason) {
    console.log("closed", code, reason);
  }

  onPong(data) {
    console.log("received pong", data);
  }

  /**
   * @param {MessageEvent} ev
   * @property {string} ev.data.event
   * @property {object} ev.data.data
   */
  onMessage(ev) {
    const data = JSON.parse(ev.data);
    const event = data.event;

    console.log(`got websocket message (event: ${event})`, data);

    switch (event) {
      case "update":
        this.onUpdateEvent(data.data);
        break;
      default:
        console.log(`unrecognized event: ${event}`);
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

  /**
   * @param {string} event
   * @param {*} data
   */
  async send(event, data) {
    console.log(`sending ws message: ${event}`, data);

    if (!this.canSendMessage()) {
      console.log("websocket not connected");
      await this.connect();
      console.log("websocket reestablished");
    }

    this.socket.send(JSON.stringify({ event, ...data }));
  }

  /**
   * @param {object} playerData
   */
  sendPlayerRegistration(playerData) {
    console.log("sending player registration", playerData);
    this.send("register", { player: playerData });
  }

  /**
   * @param {object} playerData
   */
  sendPlayerUpdate(playerData) {
    console.log("sending player update", playerData);
    this.send("updatePlayer", { player: playerData });
  }
}
