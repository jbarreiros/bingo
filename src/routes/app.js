const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use((req, res, next) => {
  const gameConfigRaw = fs.readFileSync("./game.json");
  res.gameConfig = JSON.parse(gameConfigRaw);
  next();
});

router.get("/", (req, res) => {
  if (!res.gameConfig) {
    // FIXME error
  }

  if (res.gameConfig.allowPlayers) {
    res.render("index", res.gameConfig);
  } else {
    res.render("no-game", res.gameConfig);
  }
});

router.get("/tiles", (req, res) => {
  res.render("tiles", res.gameConfig);
});

module.exports = router;
