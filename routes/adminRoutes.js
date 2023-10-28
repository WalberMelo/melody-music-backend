const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
// const adminRouter = express.Router();
const router = require("express").Router();

router.get("/users", [authMiddleware.secureRoute], adminController.getAllUser);

router.delete(
  "/users/:id",
  [authMiddleware.secureRoute],
  adminController.deleteUser
);

router.put("/users/:id", [authMiddleware.secureRoute], adminController.putUser);

module.exports = router;
