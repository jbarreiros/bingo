process.title = "BingoApp";

const path = require("path");
const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const Clients = require("./src/lib/WebsocketClients");
const port = 8080;

// frontend ------

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
const appRoutes = require("./src/routes/app"); // must be called after app.set("views")
app.use("/", appRoutes);

// websocket -----

const wsInstance = expressWs.getWss("/");
const clients = new Clients();
const players = {};

app.ws("/", (ws, req) => {
  ws.onclose = () => {
    const userId = clients.getClientId(ws);
    clients.removeClient(ws);

    delete players[userId];

    clients.getOtherClients(userId).forEach(client => {
      client.send(
        JSON.stringify({
          event: "update",
          data: players
        })
      );
    });
  };

  ws.onmessage = ev => {
    const data = JSON.parse(ev.data);
    const userId = data.player.id;

    if (data.event === "register") {
      clients.saveClient(userId, ws);
      ws.send(
        JSON.stringify({
          event: "update",
          data: players
        })
      );
    }

    players[userId] = data.player;

    clients.getOtherClients(userId).forEach(client => {
      client.send(
        JSON.stringify({
          event: "update",
          data: players
        })
      );
    });
  };
});

app.listen(port, () => console.log(`Listening on port ${port}`));
