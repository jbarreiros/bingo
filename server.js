process.title = 'BingoApp';

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const Clients = require('./src/lib/WebsocketClients');
const port = 8080;

app.use(express.static('dist'));

app.use(function (req, res, next) {
  console.log('middleware');
  return next();
});

// frontend ------

app.get('/', (req, res) => res.sendFile('dist/index.html'));

// websocket -----

const wsInstance = expressWs.getWss('/');
const clients = new Clients();
const players = {};

app.ws('/', (ws, req) => {
  ws.onopen = (data) => console.log('New client connected to websocket`');

  ws.onclose = () => {
    console.log('Websocket connection closed');
    clients.removeClient(ws);
    console.log('clients: ', clients.getClientIds());
  };

  ws.onmessage = (ev) => {
    // console.log(ev);
    const data = JSON.parse(ev.data);
    console.log(`Websocket message received: ${data.event}`);

    const userId = data.player.id;

    if (data.event === 'register') {
      console.log(`Websocker: Registering ${userId}`);
      clients.saveClient(userId, ws);
      console.log('clients: ', clients.getClientIds());
    }

    players[userId] = data.player;

    clients.getOtherClients(userId).forEach((client, id) => {
      console.log(`Sending update to ${id}`);
      client.send(JSON.stringify({
        event: 'update',
        data: players
      }));
    });
  };

  console.log('websocket initialized');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
