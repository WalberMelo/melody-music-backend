const express = require("express");
const playlistController = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");
const playlistRouter = express.Router();

playlistRouter.post(
  "/playlist",
  [authMiddleware.secureRoute],
  playlistController.createPlaylist
);

playlistRouter.put(
  "/playlist/:id",
  [authMiddleware.secureRoute],
  playlistController.editPlaylist
);

playlistRouter.get(
  "/playlist/:id",
  [authMiddleware.secureRoute],
  playlistController.getPlaylistById
);

playlistRouter.get(
  "/userplaylists",
  [authMiddleware.secureRoute],
  playlistController.getAllUserPlaylists
);

playlistRouter.get(
  "/allplaylists",
  [authMiddleware.secureRoute],
  playlistController.getAllPlaylists
);

playlistRouter.delete(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.deletePlaylistById
);

playlistRouter.put(
  "/add-song/:id",
  [authMiddleware.secureRoute],
  playlistController.addSongToPlaylist
);

playlistRouter.put(
  "/remove-song/:id",
  [authMiddleware.secureRoute],
  playlistController.removeSongFromPlaylist
);

module.exports = playlistRouter;
