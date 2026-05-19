const express = require("express");
const { optionalAuth } = require("../middleware/auth");
const controller = require("../controllers/divinationController");

const router = express.Router();

router.post("/cast", optionalAuth, controller.cast);
router.get("/history", optionalAuth, controller.history);

module.exports = router;
