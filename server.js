/**
 * Bingo App
 */

const path = require("path");
const express = require("express");
const engine = require("ejs-blocks");
const app = express();
require("express-ws")(app);

const HTTP_HOSTNAME = process.env.HOST || "localhost";
const HTTP_PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === "production";

// make it easier to kill the process; only really useful for development
process.title = "BingoApp";

// frontend
app.set("views", "./src/views");
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use("/", require("./src/routes/app"));

if (!IS_PROD) {
    app.use("/", express.static(path.join(__dirname, "/public")));
}

// websocket
app.use("/", require("./src/routes/websocket"));

app.listen(HTTP_PORT, HTTP_HOSTNAME, () =>
  console.log(`Listening on ${HTTP_HOSTNAME}:${HTTP_PORT}`)
);
