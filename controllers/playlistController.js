const { Playlist, validate } = require("../models/playlistModel");
const { User } = require("../models/userModel");


async function createPlaylist(req, res) {

  const params = validate(req.body);
  console.log(params)

  const { user } = req;
  const userID = user.id; //633af89aa629cada7c3fd9c4

  //console.log("PLAYLIST: ", newPlaylist);
  
  try {
    if (params.error)
    throw {
      msg: `${params.error}`,
    };
    if (!params.value.name || !params.value.description) {
      throw {
        msg: "Server - You need to provide a name and description for your playlist",
      };
    } else {
      const user = await User.findById(userID.valueOf());
      console.log(user)
      const playlist = await Playlist({...params.value, 
        userId: user._id,
      }).save()
      
      user.playlists.push(playlist._id);
      await user.save();


      res.status(201).send({ data: user });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

module.exports = {
  createPlaylist,
};
