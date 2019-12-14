exports.index = function(req, res) {
  if (!res.gameConfig) {
    // FIXME error
  }

  if (res.gameConfig.allowPlayers) {
    res.render("index", res.gameConfig);
  } else {
    res.render("no-game", res.gameConfig);
  }
};

exports.listTiles = function(req, res) {
  res.render("tiles", res.gameConfig);
};
