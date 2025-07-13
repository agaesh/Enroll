const bcrypt = require("bcrypt");
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const User = require('../Models/user')(sequelize, DataTypes);

exports.registerUser = async (body) => {
  try {
    // Handle user registration
    const username = body.username;
    const email = body.email;
    const password = body.password;

    // Call DB or validation logic
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Do not use res here, just throw an error or return a value
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }

    const newUser = await User.create({ username, email, password });
    return newUser; // controller will format and send response
  } catch (error) {
    throw error;
  }
};

