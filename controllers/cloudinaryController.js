const cloudinary = require("../services/cloudinary");

async function cloudinarySongUploader(req, res) {
  const song = req.file.path;

  cloudinary.uploader
    .upload(song, {
      folder: "melody/songs",
      resource_type: "video",
      use_filename: true,
      unique_filename: true,
    })
    .then((result) => {
      let track = {
        url: result.url,
        duration: result.duration,
      };

      res.send(track);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function cloudinaryThumbnailUploader(req, res) {
  let thumbnail = req.file.path;

  cloudinary.uploader
    .upload(thumbnail, {
      folder: "melody/thumbnail",
      resource_type: "auto",
      use_filename: true,
      unique_filename: true,
    })
    .then((result) => {
      res.send({ image: result.url });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { cloudinarySongUploader, cloudinaryThumbnailUploader };
