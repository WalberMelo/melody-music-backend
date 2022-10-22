const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
    },
    artists: {
        type: String,
    },
    rating: {
        type: Number
    },
    url: {
        type: String
    },
    popularity: {
        type: String
    },
    duration: {
        type: Number
    },
    userId: {
        type: String,
        ref: 'users'
    },
    genere: {
        type: String,
    },
    likedBy: [{
        type: String
    }],
     
}, 
  {
    versionKey: false,
  },
  {
    timestamps: true
  });

const validate = (song) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      artist: Joi.string().min(2).max(30).required(),
      genere: Joi.string().min(2).max(30).required(),
      url: Joi.string().required(),
      duration: Joi.number().required()
    });
    return schema.validate(song);
  };

const Song = mongoose.model("songs", songSchema);

module.exports = {Song, validate}
