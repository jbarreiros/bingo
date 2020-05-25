/**
 * @param {http.ServerRequest} res
 * @param {http.ServerResponse} res
 */
exports.index = function (req, res) {
  if (res.gameConfig.allowPlayers) {
    const { tiles, freeTile } = res.gameConfig;
    const playerTiles = generatePlayerTiles(tiles, freeTile);
    renderPage(res, "index", { playerTiles: JSON.stringify(playerTiles) });
  } else {
    renderPage(res, "no-game");
  }
};

/**
 * @param {http.ServerRequest} res
 * @param {http.ServerResponse} res
 */
exports.listTiles = function (req, res) {
  const { tiles } = res.gameConfig;
  renderPage(res, "tiles", { tiles });
};

/**
 * @param {http.ServerResponse} res
 * @param {string} pageName
 * @param {object} data
 */
function renderPage(res, viewName, data = {}) {
  const { name } = res.gameConfig;
  const locals = { name, ...data };

  if (viewName === "index") {
    // the full app
    res.render(viewName, { locals });
  } else {
    // simple non-javascripty pages
    res.render("layout", { locals, partials: { body: viewName } });
  }
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
