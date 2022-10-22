const express = require("express")
const upload = require("../middleware/multer");
const cloudinaryController = require("../controllers/cloudinaryController")
const cloudinaryRouter = express.Router();



cloudinaryRouter.post("/uploadsong", upload.single("song"), cloudinaryController.cloudinarySongUploader)
cloudinaryRouter.post("/uploadthumbnail", upload.single("thumbnail"), cloudinaryController.cloudinaryThumbnailUploader)


module.exports = cloudinaryRouter   