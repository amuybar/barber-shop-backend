const db = require("../db");
const { v4: uuidv4 } = require("uuid");

class BarberAvailability {
  constructor(id, barberId, dayOfWeek, startTime, endTime) {
    this.id = id;
    this.barberId = barberId;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  static async create(availability) {
    const id = uuidv4();
    const newAvailability = new BarberAvailability(
      id,
      availability.barberId,
      availability.dayOfWeek,
      availability.startTime,
      availability.endTime
    );
    await db.put(`availability:${id}`, JSON.stringify(newAvailability));
    return newAvailability;
  }

  static async getBarberAvailability(barberId) {
    const availability = [];
    for await (const [key, value] of db.iterator()) {
      try {
        const keyString = key.toString("utf8"); // Convert Buffer to string if necessary
        if (keyString.startsWith("availability:")) {
          const availabilityItem = JSON.parse(value);
          if (availabilityItem.barberId === barberId) {
            availability.push(availabilityItem);
          }
        }
      } catch (error) {
        console.error("Error processing availability item:", error);
      }
    }
    return availability;
  }

  static async update(id, updates) {
    const availability = await this.getById(id);
    Object.assign(availability, updates);
    await db.put(`availability:${id}`, JSON.stringify(availability));
    return availability;
  }

  static async delete(id) {
    await db.del(`availability:${id}`);
  }
}

module.exports = BarberAvailability;
