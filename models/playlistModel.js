const mongoose = require("mongoose");
const Joi = require("joi");

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "You need to provide a name for your playlist"],
    },
    collaborative: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
    },
    thumbnail: {
      type: String,
      trim: true,
      default:
        "http://res.cloudinary.com/dzfouunnx/image/upload/v1666973633/melody/thumbnail/cf7c34a044584bd3d1c4e0f0d084a974_aqoe91.jpg",
    },
    publicAccessible: {
      type: Boolean,
      default: false,
    },
    numberSongs: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 1,
      maxCount: 5,
    },
    userId: {
      type: String,
      trim: true,
      ref: "users",
    },
    tracks: [
      {
        trackId: { type: String, ref: "tracks" },
      },
    ],
    followedBy: [{ type: String }],
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const validatePlaylist = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(30).required(),
    publicAccessible: Joi.boolean().required(),
  });
  return schema.validate(playlist);
};

const Playlist = mongoose.model("playlists", playlistSchema);

module.exports = { Playlist, validatePlaylist };
