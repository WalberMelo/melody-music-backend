const { Playlist, validate } = require("../models/playlistModel");
const { User } = require("../models/userModel");

async function createPlaylist(res, req) {
  const response = res.res;
  const request = req.req;

  const params = validate(request.body);
  console.log("PARAMS", params);

  const { user } = request;
  const userID = user.id; //633af89aa629cada7c3fd9c4

  const newPlaylist = new Playlist(params.value);
  console.log("PLAYLIST: ", newPlaylist);

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
      console.log("MongoDB user id: ", user);

      const playList = await newPlaylist({
        ...request.body,
        playlistID: _id,
        userId: userID,
      }).save();
      user.playlists.push(playList._id);
      await user.save();

      response.status(201).send({ data: playList });
    }
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = {
  createPlaylist,
};
