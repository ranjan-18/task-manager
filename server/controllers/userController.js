import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User (without email verification)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create user
    const user = await User.create({ name, email, password });

    // Optionally, return JWT on registration (recommended for SPA)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "Registration successful!"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User (without email verification check)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // JWT Token for session
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Logout User
export const logoutUser = async (req, res) => {
  try {
    // If using cookies for JWT
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get all registered users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
