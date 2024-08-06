const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const db = require('../db');

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

class AuthController {
  static async register(req, res) {
    const { id, email, name, password } = req.body;
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user instance
      const newUser = new User(id, email, name, hashedPassword);
      // Save the user to the database
      await User.create(newUser);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to register user', details: err });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      // Fetch the user by email
      let user;
      for await (const [key, value] of db.createReadStream()) {
        if (value.email === email) {
          user = value;
          break;
        }
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Generate a token
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to login', details: err });
    }
  }

  static async getCurrentUser(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.getById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(401).json({ error: 'Invalid token', details: err });
    }
  }
}

module.exports = AuthController;
