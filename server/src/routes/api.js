const express = require("express");
const controller = require("../controllers/api");
const router = express.Router();

// prettier-ignore
router
  .get("/", controller.index);

module.exports = router;
