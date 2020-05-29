/**
 * Manages websocket connection, and sends messages.
 */
export class Socket {
  constructor() {
    this.socket = null;
    this.onEventCallbacks = [];
    this.heartbeatIntervalMiliseconds = 2000;
    this.heartbeatIntervalId = null;
  }

  /**
   * @returns {string}
   */
  get url() {
    const protocol =
      window.location.protocol.toLowerCase() === "https:" ? "wss" : "ws";

    let port = window.location.port;
    if (process.env.NODE_ENV === "development") {
      // FIXME, how not to hardcode this
      // package.json "proxy" property does not work here
      port = 8080;
    }

    return `${protocol}://${window.location.hostname}:${port}`;
  }

  registerEvent(fn) {
    this.onEventCallbacks.push(fn);
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
    this.onEventCallbacks.forEach((fn) => fn("update", { players }));
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
