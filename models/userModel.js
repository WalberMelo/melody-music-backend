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
    resetLink: { type: String, default: "" },
    gender: { type: String, required: true },
    birthday: { type: String, required: true },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).trim().required(),
    lastName: Joi.string().min().max(10).trim().required(),
    email: Joi.string().lowercase().trim().email(),
    password: passwordComplexity().trim().required(),
    birthday: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "non-binary").required(),
  });
  return schema.validate(user);
};

const validatePassword = (user) => {
  const schema = Joi.object({
    password: passwordComplexity().trim().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);
module.exports = { User, validate, validatePassword };
