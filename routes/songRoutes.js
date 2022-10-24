const authMiddleware = require("../middleware/authMiddleware");
const songController = require("../controllers/songController");
// const songRouter = express.Router();
const router = require("express").Router();

router.post("/", [authMiddleware.secureRoute], songController.createSong);

router.get("/all", [authMiddleware.secureRoute], songController.getAllSongs);

router.put("/:id", [authMiddleware.secureRoute], songController.updateSong);

router.put("/like/:id", [authMiddleware.secureRoute], songController.likeSong);

router.get("/like", [authMiddleware.secureRoute], songController.getLikedSongs);

router.delete("/:id", [authMiddleware.secureRoute], songController.deleteSong);

module.exports = router;
