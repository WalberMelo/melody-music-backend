const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminRouter = express.Router();

adminRouter.get(
  "/users",
  [authMiddleware.secureRoute],
  adminController.getAllUser
);

adminRouter.delete(
  "/users/:id",
  [authMiddleware.secureRoute],
  adminController.deleteUser
);

adminRouter.put(
  "/users/:id",
  [authMiddleware.secureRoute],
  adminController.putUser
);

module.exports = adminRouter;
