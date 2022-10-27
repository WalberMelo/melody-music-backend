const playlistController = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");
// const playlistRouter = express.Router();
const router = require("express").Router();

router.post(
  "/",
  [authMiddleware.secureRoute],
  playlistController.createPlaylist
);

router.put(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.editPlaylist
);

router.get(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.getPlaylistById
);

router.get(
  "/user",
  [authMiddleware.secureRoute],
  playlistController.getAllUserPlaylists
);

router.get(
  "/all",
  [authMiddleware.secureRoute],
  playlistController.getAllPlaylists
);

router.delete(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.deletePlaylistById
);

router.put(
  "/add-song/:id",
  [authMiddleware.secureRoute],
  playlistController.addSongToPlaylist
);

router.put(
  "/remove-song/:id",
  [authMiddleware.secureRoute],
  playlistController.removeSongFromPlaylist
);

router.put("/follow-playlist/:id", [authMiddleware.secureRoute], playlistController.followPlaylist)



module.exports = router;
