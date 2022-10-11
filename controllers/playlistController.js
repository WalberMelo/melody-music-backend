const mongoose = require("mongoose");
const { Playlist, validate } = require("../models/playlistModel");
const { User } = require("../models/userModel");

async function createPlaylist(res, req) {
  const params = validate(req.body);
  console.log(req.body);
  console.log(params.value);
  const newPlaylist = new Playlist(params.value);

  try {
    if (params.error)
      throw {
        msg: `${params.error}`,
      };
    if (!params.value.name || !params.value.description) {
      throw {
        msg: "Server - You need to provide a name and description for your playlist",
      };
    }

    const user = await User.findById(req.user._id);
    const playList = await newPlaylist({
      ...req.body,
      userId: user._id,
    }).save();
    user.playlists.push(playList._id);
    await user.save();

    res.status(201).send({ data: playList });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createPlaylist,
};
