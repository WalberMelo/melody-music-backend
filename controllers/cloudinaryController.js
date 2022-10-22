const cloudinary = require("../services/cloudinary");


async function cloudinarySongUploader(req, res){

    const song = req.file.path
    
    cloudinary.uploader
    .upload(song, { resource_type: "video", use_filename: true, unique_filename: true} )
    .then((result) => {
        const track = {
            url: result.url,
            duration: result.duration
        }

        res.send(track)


    })
    .catch((error) => {
      console.log(error);
    });
}



async function cloudinaryThumbnailUploader(req, res){

    const thumbnail = req.file.path

    cloudinary.uploader
    .upload(thumbnail, { resource_type: "auto", use_filename: true, unique_filename: true} )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {cloudinarySongUploader, cloudinaryThumbnailUploader};