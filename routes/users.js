const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;