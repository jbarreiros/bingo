const express = require("express");
const fs = require("fs");
const controller = require("../controllers/api");
const router = express.Router();

router.use((req, res, next) => {
  const gameConfigRaw = fs.readFileSync("./game.json");
  res.gameConfig = JSON.parse(gameConfigRaw);
  next();
});

// prettier-ignore
router
  .get("/game", controller.game)
  .get("/tiles", controller.tiles);

module.exports = router;
