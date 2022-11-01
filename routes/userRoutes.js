const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
// const userRouter = express.Router();

const router = require("express").Router();

router.get("/", [authMiddleware.secureRoute], userController.getUser);
router.post("/register", userController.postUser);
router.post("/login", userController.login);
router.put("/", [authMiddleware.secureRoute], userController.putUser);
router.delete("/", [authMiddleware.secureRoute], userController.deleteUser);

//PASSWORD RECOVERY
//1) Send email with token to the user
router.post("/password-reset", userController.sendEmail);

//2) Validate the link and show password reset form.
router.get("/resetpassword/:token", userController.resetPassword);

//3) POST in order to set a new password
router.put("/password-reset", userController.changePassword);

module.exports = router;
