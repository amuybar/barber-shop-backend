const Appointment = require('../model/appointment');
const BarberAvailability = require('../model/BarberAvailability');

exports.bookAppointment = async (req, res) => {
  try {
    const { barberId, date, time, service } = req.body;
    const customerId = req.user.id;

    const barberAvailability = await BarberAvailability.getBarberAvailability(barberId);
    const daysOfWeek = new Date(date).getDate();
    const isAvailable = barberAvailability.some(a => a.daysOfWeek === daysOfWeek && a.startTime === time && a.endTime === time);

    if (!isAvailable) {
      return res.status(400).json({ error: 'Barber is not available at the selected time slot' });
    }

    const appointment = await Appointment.create({
      barberId,
      customerId,
      date,
      time,
      service,
      status: 'pending'
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id, date, time } = req.body;
    const appointment = await Appointment.getById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.customerId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check new time availability (similar to bookAppointment)

    const updatedAppointment = await Appointment.update(id, { date, time });
    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.getById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.customerId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Appointment.update(id, { status: "cancelled" });
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/barberController.js
exports.setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const barberId = req.user.id; // Assuming you have auth middleware that sets req.user

    const availability = await BarberAvailability.create({
      barberId,
      dayOfWeek,
      startTime,
      endTime,
    });
    res.status(201).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const barberId = req.user.id;
    const availability = await BarberAvailability.getBarberAvailability(
      barberId
    );
    res.json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};