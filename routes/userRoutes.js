const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth_controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, userController.updateUserProfile);

module.exports = router;
