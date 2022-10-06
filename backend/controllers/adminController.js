const bcryptjs = require("bcryptjs");
const { User } = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

async function getAllUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);

  try {
    const users = await User.find();
    console.log(users);

    if (!users) {
      res.status(404).send({
        msg: "Error: user doesn't exist",
      });
    } else if (!user_token.isAdmin) {
      res.status(403).send({
        msg: "Forbidden -- Access to this resource on the server is denied!",
      });
    } else if (user_token.isAdmin) {
      //remove password for security reasons
      users.password = null;
      res.status(200).send({
        users: users,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  console.log(user_token);
  const userId = req.params.id;
  //ID the user clicked for deleted

  try {
    User.findById(userId, (err, userData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else if (!user_token.isAdmin) {
        res.status(403).send({ msg: "Error: unauthorized request" });
      }
      User.findByIdAndDelete(userId, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Server status error" });
        } else if (!result) {
          res.status(404).send({ msg: "Error: User doesn't exist" });
        }
        res.status(200).send({ msg: "User deleted successfully" });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server status error" });
  }
}

async function putUser(req, res) {
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
        //if there is no data or it is not found throw error
        if (!userData) {
          res.status(404).send({
            msg: "Error: User not found",
          });
        } else if (!user_token.isAdmin) {
          res.status(403).send({
            msg: "Error: unauthorized request",
          });
        } else {
          const salt = bcryptjs.genSaltSync(10);
          // replace old info with the new info received
          userData.isAdmin = params.isAdmin;
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

module.exports = {
  getAllUser,
  deleteUser,
  putUser,
};
