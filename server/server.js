/**
 * Bingo App
 */

const path = require("path");
const express = require("express");
const app = express();
require("express-ws")(app);

const HTTP_HOSTNAME = process.env.HOST || "0.0.0.0";
const HTTP_PORT = process.env.PORT || 8080;

// frontend api
app.use("/api", require("./src/routes/api"));

// websocket
app.use("/", require("./src/routes/websocket"));

// react app (relevant to production)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(HTTP_PORT, HTTP_HOSTNAME, () =>
  console.info(`Listening on ${HTTP_HOSTNAME}:${HTTP_PORT}`)
);
