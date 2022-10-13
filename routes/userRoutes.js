const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", userController.postUser);
userRouter.post("/login", userController.login);
userRouter.get("/user", [authMiddleware.secureRoute], userController.getUser);
userRouter.put("/user", [authMiddleware.secureRoute], userController.putUser);
userRouter.delete(
  "/user",
  [authMiddleware.secureRoute],
  userController.deleteUser
);

module.exports = userRouter;
