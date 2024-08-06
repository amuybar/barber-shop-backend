const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/book", authMiddleware, appointmentController.bookAppointment);
router.put(
  "/reschedule",
  authMiddleware,
  appointmentController.rescheduleAppointment
);
router.delete(
  "/cancel/:id",
  authMiddleware,
  appointmentController.cancelAppointment
);

module.exports = router;
