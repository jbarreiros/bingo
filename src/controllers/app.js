exports.index = function(req, res) {
  if (res.gameConfig.allowPlayers) {
    const { tiles, freeTile } = res.gameConfig;
    const playerTiles = generatePlayerTiles(tiles, freeTile);
    renderPage(res, "index", { playerTiles });
  } else {
    renderPage(res, "no-game");
  }
};

exports.listTiles = function(req, res) {
  renderPage(res, "tiles");
};

/**
 *
 * @param {http.ServerResponse} res
 * @param {string} pageName
 * @param {object} data
 */
function renderPage(res, pageName, data = {}) {
  const { title } = res.gameConfig;
  const templateData = { title, ...data };

  res.render(pageName, templateData);
}

/**
 * @param {string[]} tiles
 * @param {string} freeTile
 */
function generatePlayerTiles(tiles, freeTile) {
  const randomizedTiles = tiles.sort(() => Math.random() - 0.5);
  randomizedTiles.splice(12, 0, freeTile);

  return randomizedTiles;
}
