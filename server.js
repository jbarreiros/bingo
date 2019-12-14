process.title = "BingoApp";

const express = require("express");
const app = express();
require("express-ws")(app);
const port = 8080;

// frontend
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", require("./src/routes/app"));

// websocket
app.use("/", require("./src/routes/websocket"));

app.listen(port, () => console.log(`Listening on port ${port}`));
