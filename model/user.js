const db = require("../db");

class User {
  constructor(id, email, name, password) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  static async create(user) {
    try {
      await db.put(`user:${user.id}`, JSON.stringify(user));
      await db.put(`email:${user.email}`, user.id);
      console.log("User created successfully");
    } catch (err) {
      console.error("Failed to create user", err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const userStr = await db.get(`user:${id}`);
      return JSON.parse(userStr);
    } catch (err) {
      if (err.notFound) {
        console.log("User not found", err);
        return null;
      } else {
        console.error("Error fetching the user", err);
        throw err;
      }
    }
  }

  static async getByEmail(email) {
    try {
      const userId = await db.get(`email:${email}`);
      return this.getById(userId);
    } catch (err) {
      if (err.notFound) {
        console.log("User not found", err);
        return null;
      } else {
        console.error("Error fetching the user", err);
        throw err;
      }
    }
  }

  static async checkUserExist(email) {
    try {
      await db.get(`email:${email}`);
      return true;
    } catch (err) {
      if (err.notFound) {
        return false;
      } else {
        console.error("Error checking user existence", err);
        throw err;
      }
    }
  }

  static async update(user) {
    try {
      await db.put(`user:${user.id}`, JSON.stringify(user));
      console.log("Successfully updated");
    } catch (err) {
      console.error("Failed to update the user", err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const user = await this.getById(id);
      if (user) {
        await db.del(`user:${id}`);
        await db.del(`email:${user.email}`);
        console.log("Deleted successfully");
      } else {
        console.log("User not found");
      }
    } catch (err) {
      console.error("Failed to delete the user", err);
      throw err;
    }
  }
}

module.exports = User;
