const express = require("express");
const { authRequired } = require("../middleware/auth");
const controller = require("../controllers/authController");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/google", controller.googleLogin);
router.get("/me", authRequired, controller.me);

module.exports = router;
