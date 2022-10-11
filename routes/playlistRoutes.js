const express = require("express");
const playlistController = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");
const playlistRouter = express.Router();

playlistRouter.post(
  "/playlist",
  [authMiddleware.secureRoute],
  playlistController.createPlaylist
);

module.exports = playlistRouter;
