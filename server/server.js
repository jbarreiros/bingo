/**
 * Bingo App
 */

const path = require("path");
const express = require("express");
const app = express();
require("express-ws")(app);

const HTTP_HOSTNAME = process.env.HOST || "0.0.0.0";
const HTTP_PORT = process.env.PORT || 8080;
// const IS_PROD = process.env.NODE_ENV === "production";

// frontend
// app.set("views", ["./public"]);
app.use("/", require("./src/routes/api"));

// if (!IS_PROD) {
//   app.use("/", express.static(path.join(__dirname, "/public")));
// }

// websocket
app.use("/", require("./src/routes/websocket"));

app.listen(HTTP_PORT, HTTP_HOSTNAME, () =>
  console.info(`Listening on ${HTTP_HOSTNAME}:${HTTP_PORT}`)
);
