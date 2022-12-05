const upload = require("../middleware/multer");
const cloudinaryController = require("../controllers/cloudinaryController");
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

router.post(
  "/avatar",
  upload.single("avatar"),
  cloudinaryController.cloudinaryAvatarUploader
);

module.exports = router;
