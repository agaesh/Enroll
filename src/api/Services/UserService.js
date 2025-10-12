import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
import sequelize from "../../Config/db.js";
import UserModel from "../Models/user.js";

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const User = UserModel(sequelize, DataTypes);

// ✅ Register User
const registerUser = async (body) => {
  try {
    const { username, email, password } = body;

    // Check existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error("Email already in use");
      error.status = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

// ✅ Login User
const loginUser = async (body) => {
  try {
    const { email, password } = body;

    // Find user
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      const error = new Error("Email does not exist");
      error.status = 401;
      throw error;
    }

    // Validate password
    const validatePassword = await bcrypt.compare(password, findUser.password);
    if (!validatePassword) {
      const error = new Error(
        "Invalid credentials. Please check your password or register an account."
      );
      error.status = 400;
      throw error;
    }

    // Generate token
    const token = jwt.sign(
      { id: findUser.id, email: findUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token + sanitized user
    const { password: _, ...userData } = findUser.toJSON();

    return {
      success: true,
      message: "Login successful",
      token,
      user: userData,
    };
  } catch (error) {
    throw error;
  }
};

// ✅ Single default export
export default {
  registerUser,
  loginUser
};
