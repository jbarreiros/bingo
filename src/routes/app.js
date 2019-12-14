const express = require("express");
const fs = require("fs");
const controller = require("../controllers/app");
const router = express.Router();

router.use((req, res, next) => {
  const gameConfigRaw = fs.readFileSync("./game.json");
  res.gameConfig = JSON.parse(gameConfigRaw);
  next();
});

// prettier-ignore
router
  .get("/", controller.index)
  .get("/tiles", controller.listTiles);

module.exports = router;
