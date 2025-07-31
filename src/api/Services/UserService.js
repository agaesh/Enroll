const bcrypt = require("bcrypt");
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
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

exports.LoginUser = async(body)=>{
  try{

    const email = body.email;
    const password = body.password;
    const findUser = await User.findOne({email})
    const validatePassword = await bcrypt.compare(password, findUser.password)

    if(!findUser){
      const error = new Error('Email does not exist');
      error.status = 401;
      throw error
    }
    if(!validatePassword){
      const error = new Error('Account Not Exist')
      error.status = 400;
      throw error
    }

    const token = jwt.sign({ id: findUser.id, email: findUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

     // Return both token and user data (excluding password)
    return {
      token,
      findUser
    };
   
  }catch(error){
    console.error("this error is =" + error)
  }
}

