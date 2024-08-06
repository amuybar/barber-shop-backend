const express = require("express");
const router = express.Router();
const barberController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/availability", authMiddleware, barberController.setAvailability);
router.get("/availability", authMiddleware, barberController.getAvailability);

module.exports = router;
