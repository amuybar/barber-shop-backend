const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("SECRET_KEY is not set in environment variables");
  process.exit(1);
}

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Check if the user exists
    const user = await User.getById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Attach the user to the request object
    req.user = { id: user.id };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
