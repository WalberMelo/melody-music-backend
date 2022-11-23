const playlistController = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get(
  "/user/playlist",
  [authMiddleware.secureRoute],
  playlistController.getAllUserPlaylists
);
router.get(
  "/all/playlist",
  [authMiddleware.secureRoute],
  playlistController.getAllPlaylists
);
router.get("/public", playlistController.getPublicPlaylists);
router.get("/public/:id", playlistController.getPublicPlaylistById);

router.get(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.getPlaylistById
);

router.post(
  "/create",
  [authMiddleware.secureRoute],
  playlistController.createPlaylist
);
//if( !mongoose.Types.ObjectId.isValid(id) ) return false;
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
router.put(
  "/follow-playlist/:id",
  [authMiddleware.secureRoute],
  playlistController.followPlaylist
);
router.put(
  "/edit/:id",
  [authMiddleware.secureRoute],
  playlistController.editPlaylist
);

router.delete(
  "/:id",
  [authMiddleware.secureRoute],
  playlistController.deletePlaylistById
);

module.exports = router;
