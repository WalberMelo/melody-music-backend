const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: Joi.string().required(),
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).trim().required(),
    lastName: Joi.string().min(5).max(10).trim().required(),
    email: Joi.string().lowercase().trim().email(),
    password: passwordComplexity().trim().required(),
    birthday: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "non-binary").required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);
module.exports = { User, validate };
