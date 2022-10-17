const express = require("express");
const playlistController = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");
const playlistRouter = express.Router();

playlistRouter.post(
  "/playlist",
  [authMiddleware.secureRoute],
  playlistController.createPlaylist
);

playlistRouter.put("/playlist/:id", [authMiddleware.secureRoute], playlistController.getPlaylist)

playlistRouter.get("/playlist/:id", [authMiddleware.secureRoute], playlistController.getPlaylistById)

playlistRouter.get("/userplaylists", [authMiddleware.secureRoute], playlistController.getAllUserPlaylists)

playlistRouter.get("/allplaylists", [authMiddleware.secureRoute], playlistController.getAllPlaylists)

playlistRouter.delete("/:id", [authMiddleware.secureRoute], playlistController.deletePlaylistById)

module.exports = playlistRouter;
