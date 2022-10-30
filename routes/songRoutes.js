const authMiddleware = require("../middleware/authMiddleware");
const songController = require("../controllers/songController");
// const songRouter = express.Router();
const router = require("express").Router();

router.post("/", [authMiddleware.secureRoute], songController.createSong);

router.get(
  "/all-user-songs",
  [authMiddleware.secureRoute],
  songController.getAllUserSongs
);

router.get("/all-songs", songController.getAllSongs);
router.get("/like", [authMiddleware.secureRoute], songController.getLikedSongs);

router.put("/like/:id", [authMiddleware.secureRoute], songController.likeSong);
router.put("/:id", [authMiddleware.secureRoute], songController.updateSong);

router.delete("/:id", [authMiddleware.secureRoute], songController.deleteSong);

module.exports = router;
