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
    month: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    lastName: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    month: Joi.string().required(),
    date: Joi.string().required(),
    year: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "non-binary").required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);
module.exports = { User, validate };
