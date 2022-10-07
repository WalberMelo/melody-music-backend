const jwt = require("../services/jwtServices");
const bcryptjs = require("bcryptjs");
const { User, validate } = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

async function postUser(req, res) {
  const params = validate(req.body);
  //console.log(params.value); value is generated by validate method.
  const user = new User(params.value);

  try {
    if (params.error)
      throw {
        msg: `${params.error}`,
      };
    //require email and password
    if (!params.value.email)
      throw {
        msg: "Error: email can not be null",
      };
    if (!params.value.password)
      throw {
        msg: "Error: password can not be null",
      };

    //Avoid duplicated emails
    const emailExists = await User.findOne({
      email: params.value.email,
    });
    if (emailExists)
      throw {
        msg: "Email already exists",
      };

    // encrypting password
    const salt = bcryptjs.genSaltSync(10);
    user.password = await bcryptjs.hash(params.value.password, salt);

    user.save();
    res.status(201).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    User.findOne(
      {
        email: email,
      },
      async (err, userData) => {
        if (err) {
          res.status(500).send({
            msg: "Server status error",
          });
        } else {
          if (!userData) {
            res.status(400).send({
              msg: "Error: email doesn't exists",
            });
          } else {
            //Check if password match the encrypted pwr
            const passwordCorrect = await bcryptjs.compare(
              password,
              userData.password
            );
            if (!passwordCorrect) {
              res.status(403).send({
                msg: "Error incorrect password",
              });
            } else {
              //Create token with 24h of validation establish in createToken func. in jwtServices.js
              const token = await jwt.createToken(userData, "24h");
              res.status(200).send({
                token: token,
              });
            }
          }
        }
      }
    );
  } catch (error) {
    req.status(500).send(error);
  }
}

async function getUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  console.log(user_token);

  try {
    const user = await User.findById(user_token.id);
    console.log(user);

    if (!user) {
      res.status(404).send({
        msg: "Error: user doesn't exist",
      });
    } else if (user._id != user_token.id) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      //remove password for security reasons
      user.password = null;
      res.status(200).send({
        user: user,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function putUser(req, res) {
  ///console.log(req.params.id)
  //recover id and params
  const userId = req.params.id;
  const params = req.body;
  const user_token = await authMiddleware.getUser(req, res);

  try {
    //get the user
    User.findById(userId, async (err, userData) => {
      if (err) {
        res.status(500).send({
          msg: "Server status error",
        });
      } else {
        //if ther is no data or it is not foun trhw error
        if (!userData) {
          res.status(404).send({
            msg: "Error: User not found",
          });
        } else if (user_token.id !== userData._id.valueOf()) {
          res.status(403).send({
            msg: "Error: unauthorized request",
          });
        } else {
          const salt = bcryptjs.genSaltSync(10);
          // replace old info with the new info received
          userData.name = params.name;
          userData.lastName = params.lastName;
          userData.email = params.email;
          userData.gender = params.gender;
          userData.year = params.year;
          userData.month = params.month;
          userData.date = params.date;
          //verify that password is not left uncompleted
          if (params.password) {
            userData.password = await bcryptjs.hash(params.password, salt);
          }
        }
      }
      User.findByIdAndUpdate(userId, userData, (err, result) => {
        if (err) {
          res.status(500).send({
            msg: "Server status error",
          });
        } else if (!result) {
          res.status(404).send({
            msg: "Error: user doesn't exists",
          });
        } else {
          res.status(201).send({
            user: userData,
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const userId = req.params.id;
  try {
    User.findById(userId, (err, userData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else if (user_token.id !== userData.id.valueOf()) {
        res.status(403).send({ msg: "Error: unauthorized request" });
      }
      User.findByIdAndDelete(userId, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Server status error" });
        } else if (!result) {
          res.status(404).send({ msg: "Error: User doesn't exist" });
        }
        res.status(200).send({ masg: "User deleted succesfully" });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server status error" });
  }
}

module.exports = {
  postUser,
  login,
  getUser,
  putUser,
  deleteUser,
};