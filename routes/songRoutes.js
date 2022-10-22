const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const songController = require("../controllers/songController")
const songRouter = express.Router();



songRouter.post("/song", [authMiddleware.secureRoute], songController.createSong)

songRouter.get("/songs", [authMiddleware.secureRoute], songController.getAllSongs)
 //! Add endpoint paramter bellow
songRouter.put("/:id", [authMiddleware.secureRoute], songController.updateSong)

songRouter.put("/like/:id", [authMiddleware.secureRoute], songController.likeSong)

songRouter.get("/like", [authMiddleware.secureRoute], songController.getLikedSongs)

songRouter.delete("/song/:id", [authMiddleware.secureRoute], songController.deleteSong)

module.exports = songRouter