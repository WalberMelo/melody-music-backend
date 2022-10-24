const express = require("express");
const upload = require("../middleware/multer");
const cloudinaryController = require("../controllers/cloudinaryController");
// const cloudinaryRouter = express.Router();
const router = require("express").Router();

router.post(
  "/uploadsong",
  upload.single("song"),
  cloudinaryController.cloudinarySongUploader
);
router.post(
  "/uploadthumbnail",
  upload.single("thumbnail"),
  cloudinaryController.cloudinaryThumbnailUploader
);

module.exports = router;
