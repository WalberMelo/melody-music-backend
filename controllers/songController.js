const { User } = require("../models/userModel");
const { Song, validate } = require("../models/songModel");
const authMiddleware = require("../middleware/authMiddleware");

// Create Song

async function createSong(req, res) {
  const params = validate(req.body);
  const user_token = await authMiddleware.getUser(req, res);

  try {
    if (params.error)
      throw {
        msg: `${params.error}`,
      };
    if (!params) {
      throw { msg: "Mandatory filds must be provided in order to proceed" };
    } else {
      const song = await Song({
        ...params.value,
        userId: user_token.id,
      }).save();

      res.status(200).send({ data: song });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get all songs from user
async function getAllUserSongs(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  try {
    const songs = await Song.find({ userId: user_token.id });

    if (!songs) {
      res.status(404).send({ msg: "Error no songs found" });
    } else {
      res.status(200).send({ songs });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get all songs in data base
async function getAllSongs(req, res) {
  try {
    const songs = await Song.find();

    if (!songs) {
      res.status(404).send({ msg: "Error no songs found" });
    } else {
      res.status(200).send({ songs });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Update Songs

async function updateSong(req, res, next) {
  const user_token = await authMiddleware.getUser(req, res);
  const song = await Song.findById(req.params.id);
  try {
    if (!song) {
      res.status(404).send({
        msg: "Error: Song doesn't exist",
      });
    } else if (user_token.id !== song.userId) {
      res.status(403).send({ msg: "Error: unauthorized request" });
    } else {
      song.title = req.body.title;
      song.artist = req.body.artist;
      song.genre = req.body.genre;
      await song.save();
      res.status(201).send({ msg: "Song updated successfully" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Liked song

async function likeSong(req, res) {
  const song = await Song.findById(req.params.id);
  const user_token = await authMiddleware.getUser(req, res);
  const user = await User.findById(user_token.id);
  const index_user = user.likedSongs.indexOf(song._id);
  const index_song = song.likedBy.indexOf(user._id);

  try {
    if (!song) {
      res.status(404).send({ msg: "Song not found" });
    } else {
      if (index_user === -1 && index_playlist === -1) {
        user.likedSongs.push(song._id);
        song.likedBy.push(user._id);
        res.status(200).send({ msg: "Added to liked songs" });
      } else {
        user.likedSongs.splice(index_song, 1);
       song.likedBy.splice(index_user, 1);
        res.status(201).send({ msg: "Removed from your liked songs" });
      }
      await user.save();
      await song.save();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// get liked songs

async function getLikedSongs(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const user = await User.findById(user_token.id);
  const songs = await Song.find({ _id: user.likedSongs });
  try {
    if (!songs) {
      res.status(404).send({ msg: "Song doesn't exist" });
    } else {
      res.status(200).send({ songs, msg: "These are all your liked songs" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Delete Songs

async function deleteSong(req, res) {
  const song = await Song.findById(req.params.id);
  const user_token = await authMiddleware.getUser(req, res);
  const user = await User.findById({ _id: user_token.id });
  try {
    if (!song) {
      res.status(404).send({ msg: "Song doesn't exist" });
    } else if (user_token.id !== song.userId) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      await song.delete();
      res.status(200).send({ msg: "Song removed successfully" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createSong,
  getAllUserSongs,
  getAllSongs,
  updateSong,
  likeSong,
  getLikedSongs,
  deleteSong,
};
