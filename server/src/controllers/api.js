/**
 * @param {http.ServerRequest} req
 * @param {http.ServerResponse} res
 */
exports.game = (req, res) => {
    res.json({
        allowPlayers: res.gameConfig.allowPlayers,
    });
};

/**
 * @param {http.ServerRequest} req
 * @param {http.ServerResponse} res
 */
exports.tiles = (req, res) => {
    const { tiles, freeTile } = res.gameConfig;
    const playerTiles = generatePlayerTiles(tiles, freeTile);

    res.json({ playerTiles });
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