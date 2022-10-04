const express = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", userController.postUser);
userRouter.get("/login", userController.login);
userRouter.get("/user", [authMiddleware.secureRoute], userController.getUser);
userRouter.put(
  "/user/:id",
  [authMiddleware.secureRoute],
  userController.putUser
);
userRouter.delete(
  "/user/:id",
  [authMiddleware.secureRoute],
  userController.deleteUser
);

module.exports = userRouter;
