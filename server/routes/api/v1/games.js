const express = require("express");
const router = express.Router();
const gamesController = require("../../../controllers/games");

router.get("/get-game/:type", gamesController.getGame);

module.exports = router;
