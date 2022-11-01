const { Playlist, validatePlaylist } = require("../models/playlistModel");
const { User } = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");
const { Song } = require("../models/songModel");

async function createPlaylist(req, res) {
  console.log(req.body);
  const params = validatePlaylist(req.body);

  const { user } = req;
  const userID = user.id;

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

      const playlist = await Playlist({
        ...params.value,
        userId: user._id,
      }).save();

      user.playlists.push(playlist._id);
      await user.save();

      res.status(201).send({ data: playlist });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

//edit playlist by id (edit basic parameters not to add mor songs on playlist)

async function editPlaylist(req, res, next) {
  const user_token = await authMiddleware.getUser(req, res);
  const playlist = await Playlist.findById(req.params.id);
  console.log(playlist);
  console.log(user_token);

  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (user_token.id !== playlist.userId) {
      res.status(403).send({
        msg: "Forbidden -- Access to this resource on the server is denied!",
      });
    } else {
      playlist.name = req.body.name;
      playlist.description = req.body.description;
      playlist.publicAccessible = req.body.publicAccessible;
      playlist.thumbnail = req.body.thumbnail;

      await playlist.save();
      res.status(201).send({ msg: "Playlist updated successfully" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Add song to playlist
//? Need to create song modal before finishing fuction

async function addSongToPlaylist(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const playlist = await Playlist.findById(req.params.id);

  const song = await Song.findById(req.body);
  const tracks = playlist.tracks.map((track) => track._id.toString());

  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (user_token.id !== playlist.userId) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else if (!song || song === null) {
      res.status(404).send({ msg: "Error: Song doesn't exist'" });
    } else if (tracks.indexOf(req.body._id) !== -1) {
      res.status(501).send({ msg: "Error: Song already in playlist" });
    } else if (tracks.indexOf(req.body._id) === -1) {
      playlist.tracks.push(req.body._id);

      await playlist.save();
      res.status(200).send({ data: playlist, message: "Added to playlist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//remove song from playlist

async function removeSongFromPlaylist(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const playlist = await Playlist.findById(req.params.id);
  const song = await Song.findById(req.body);

  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (user_token.id !== playlist.userId) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else if (!song || song === null) {
      res.status(404).send({ msg: "Error: Song doesn't exist'" });
    } else {
      const index = playlist.tracks.indexOf(req.body.trackId);
      playlist.tracks.splice(index, 1);
      await playlist.save();
      res
        .status(200)
        .send({ data: playlist, message: "Removed from playlist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// get playlist by id

async function getPlaylistById(req, res) {
  const playlist = await Playlist.findById(req.params.id);
  const user_token = await authMiddleware.getUser(req, res);
  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (user_token.id !== playlist.userId) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      const playlist = {
        title: playlist.tracks,
        description: playlist.description,
        image: playlist.thumbnail,
        isPublic: playlist.publicAccessible,
      };
      res
        .status(200)
        .send({ playlist, msg: "These are the tracks in your playlist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//get all playlists of the user

async function getAllUserPlaylists(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const playlists = await Playlist.find({ userId: user_token.id });
  try {
    if (!playlists) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else {
      res
        .status(200)
        .send({ data: playlists, msg: "these are all your playlists" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Get all playlists crated only for admin
async function getAllPlaylists(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const playlists = await Playlist.find();
  try {
    if (!playlists) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (!user_token.isAdmin) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      res
        .status(200)
        .send({ data: playlists, msg: "these are all you playlists" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Delete playlist by id

async function deletePlaylistById(req, res) {
  const playlist = await Playlist.findById(req.params.id);
  const user_token = await authMiddleware.getUser(req, res);
  const user = await User.findById({ _id: user_token.id });
  console.log(user);

  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else if (user_token.id !== playlist.userId) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      const index = user.playlists.indexOf(req.params.id);
      console.log(index);
      user.playlists.splice(index, 1);
      await user.save();
      await playlist.remove();

      res.status(200).send({ msg: "Playlist removed successfully" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function followPlaylist(req, res) {
  const playlist = await Playlist.findById(req.params.id);
  const user_token = await authMiddleware.getUser(req, res);
  const user = await User.findById(user_token.id);
  const index_user = user.playlists.indexOf(playlist._id);
  const index_playlist = playlist.followedBy.indexOf(user._id);

  try {
    if (!playlist) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else {
      if (index_user === -1 && index_playlist === -1) {
        user.playlists.push(playlist._id);
        playlist.followedBy.push(user._id);
        res.status(200).send({
          msg: "Added to your Playlists",
        });
      } else {
        user.playlists.splice(index_playlist, 1);
        playlist.followedBy.splice(index_user, 1);
        res.status(201).send({
          msg: "Removed from your playlist",
        });
      }
      await user.save();
      await playlist.save();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getRandomPlaylists(req, res) {
  const playlists = await Playlist.aggregate([{ $sample: { size: 6 } }]);

  try {
    if (!playlists) {
      res.status(404).send({
        msg: "Error: Playlist doesn't exist",
      });
    } else {
      res.status(200).send({
        data: playlists,
        msg: "these are some random playlists",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = {
  createPlaylist,
  editPlaylist,
  getAllPlaylists,
  getAllUserPlaylists,
  deletePlaylistById,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  followPlaylist,
  getRandomPlaylists,
};
