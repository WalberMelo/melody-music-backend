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

//PASSWORD RECOVERY
//1) Send email with token to the user
userRouter.post("/password-reset", userController.sendEmail);

//2) Validate the link and show password reset form.
userRouter.get("/resetpassword/:token", userController.resetPassword);

//3) POST in order to set a new password
userRouter.put("/password-reset", userController.changePassword);

module.exports = userRouter;
