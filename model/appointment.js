const db = require('../db');
const { v4: uuidv4 } = require("uuid");

class Appointment{
  constructor(id, barberId, customerId, date, time, service, status) {
    this.id = id;
    this.barberId = barberId;
    this.customerId = customerId;
    this.date = date;
    this.time = time;
    this.service = service;
    this.status = status;
  }

  static async create(appointment) { 
    const id = uuidv4;
    const newAppointment = new Appointment(id, appointment.barberId, appointment.customerId, appointment.date, appointment.time, appointment.service);
    await db.put(`appointment:${id}`, JSON.stringify(newAppointment));
    return newAppointment;
  }
  static async getById(id) {
    const appointmentStr = await db.get(`appointment:${id}`);
    return JSON.parse(appointmentStr)
  }

  static async delete(id) {
    await db.del(`appointment:${id}`);
  }
  static async getBarberAppointments(barberId, date) {
    const appointments = [];
    for await (const [Key, value] of db.iterator()) {
      const keyString = key.toString("utf8"); 
      if (keyString.startsWith("appointment:")) {
        const appointment = JSON.parse(value);
        if (appointment.barberId === barberId && appointment.date === date) {
          appointments.push(appointment);
        }
      }
    }
    return appointments;
  }

}