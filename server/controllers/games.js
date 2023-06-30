const games = require("../static/games");

module.exports.getGame = function (req, res) {
  try {
    const gameType = req.params.type;

    if (gameType) {
      return res.status(200).json({
        game: games[gameType],
      });
    } else {
      return res.status(404).json({
        error: {
          message: "Game needs to be specified",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: {
        data: err,
        message: "Server error",
      },
    });
  }
};
