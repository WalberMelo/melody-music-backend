const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

//CRUD USER OPERATIONS
userRouter.post("/register", userController.postUser);
userRouter.post("/login", userController.login);
userRouter.get("/user", [authMiddleware.secureRoute], userController.getUser);
userRouter.put("/user", [authMiddleware.secureRoute], userController.putUser);
userRouter.delete(
  "/user",
  [authMiddleware.secureRoute],
  userController.deleteUser
);

//PASSWORD RECOVERY
//POST email in order to send token
userRouter.post("/password-reset", userController.sendEmail);
//POST in order to change password
userRouter.post(
  "/password-reset/:userId/:token",
  userController.changePassword
);
//GET route which will validate the link and show password reset form.
userRouter.get("/resetpassword/:token", userController.resetPassword);

module.exports = userRouter;
