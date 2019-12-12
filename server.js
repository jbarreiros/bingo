process.title = 'BingoApp';

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const Clients = require('./src/lib/WebsocketClients');
const port = 8080;

app.use(express.static('dist'));

app.use(function (req, res, next) {
  return next();
});

// frontend ------

app.get('/', (req, res) => res.sendFile('dist/index.html'));

// websocket -----

const wsInstance = expressWs.getWss('/');
const clients = new Clients();
const players = {};

app.ws('/', (ws, req) => {
  ws.onclose = () => {
    const userId = clients.getClientId(ws);
    clients.removeClient(ws);

    delete players[userId];

    clients.getOtherClients(userId).forEach((client, id) => {
      client.send(JSON.stringify({
        event: 'update',
        data: players
      }));
    });
  };

  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    const userId = data.player.id;

    if (data.event === 'register') {
      clients.saveClient(userId, ws);

      ws.send(JSON.stringify({
        event: 'update',
        data: players
      }));
    }

    players[userId] = data.player;

    clients.getOtherClients(userId).forEach((client, id) => {
      client.send(JSON.stringify({
        event: 'update',
        data: players
      }));
    });
  };
})

app.listen(port, () => console.log(`Listening on port ${port}`));
