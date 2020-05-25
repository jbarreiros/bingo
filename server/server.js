/**
 * Bingo App
 */

const path = require("path");
const express = require("express");
const es6Renderer = require('express-es6-template-engine')
const app = express();
require("express-ws")(app);

const HTTP_HOSTNAME = process.env.HOST || "localhost";
const HTTP_PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === "production";

// frontend
app.set("views", ["./src/views", "./public"]);
app.engine("html", es6Renderer);
app.set("view engine", "html");
app.use("/", require("./src/routes/app"));

if (!IS_PROD) {
  app.use("/", express.static(path.join(__dirname, "/public")));
}

// websocket
app.use("/", require("./src/routes/websocket"));

app.listen(HTTP_PORT, HTTP_HOSTNAME, () =>
  console.info(`Listening on ${HTTP_HOSTNAME}:${HTTP_PORT}`)
);
